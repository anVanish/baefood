import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../slices/loginModalSlice';
import LoginModal from '../../components/modal/LoginModal';
import {
    getFoods,
    updateFood,
    deleteFood,
    addFood,
} from '../../slices/foodSlice';
import { getCategories } from '../../slices/categorySlice';
import { formatServeDate } from '../../utils/ServeDateFormat';
import ConfirmModal from '../../components/modal/ConfirmModal';
import EditFoodModal from '../../components/modal/EditFoodModal';

const AdminFood = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
    const [isEditModalShow, setIsEditModalShow] = useState(false);
    const [isAddModalShow, setIsAddModalShow] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    //get foods
    const { foods } = useSelector((state) => state.food);
    //get categories
    const { categories } = useSelector((state) => state.category);

    //initial data load
    const initData = () => {
        dispatch(getFoods({ categoryId: '', limit: 100 }));
        dispatch(getCategories());
    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            initData();
        } else {
            dispatch(openModal({ isAdmin: true }));
        }
    }, [dispatch]);

    //on login success
    const onLoginSuccess = () => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
        dispatch(closeModal());
        initData();
    };

    // #region handle delete food modal action------------
    const handleOpenDeleteModal = (food) => {
        setIsDeleteModalShow(true);
        setSelectedFood(food);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalShow(false);
        setSelectedFood(null);
    };

    const handleConfirmDeleteModal = () => {
        dispatch(deleteFood({ foodId: selectedFood._id }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setIsDeleteModalShow(false);
                    dispatch(
                        getFoods({ categoryId: selectedCategory, limit: 100 })
                    );
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };
    //#endregion

    // #region handle add food modal action------------
    const handleOpenAddModal = (food) => {
        setIsAddModalShow(true);
        setSelectedFood(food);
    };

    const handleCloseAddModal = () => {
        setIsAddModalShow(false);
        setSelectedFood(null);
    };

    const handleConfirmAddModal = (
        name,
        categoryId,
        description,
        chef,
        imageLink
    ) => {
        const food = { name, categoryId, description, chef, imageLink };
        dispatch(addFood({ food }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setIsAddModalShow(false);
                    dispatch(
                        getFoods({ categoryId: selectedCategory, limit: 100 })
                    );
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };
    //#endregion

    // #region handle edit food modal action------------
    const handleOpenEditModal = (food) => {
        setIsEditModalShow(true);
        setSelectedFood(food);
    };

    const handleCloseEditModal = () => {
        setIsEditModalShow(false);
        setSelectedFood(null);
    };

    const handleConfirmEditModal = (
        name,
        categoryId,
        description,
        chef,
        imageLink
    ) => {
        const food = {
            _id: selectedFood._id,
            name,
            categoryId,
            description,
            chef,
            imageLink,
        };
        dispatch(updateFood({ food }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setIsEditModalShow(false);
                    dispatch(
                        getFoods({ categoryId: selectedCategory, limit: 100 })
                    );
                }
            })
            .catch((error) => {
                console.error('Update failed:', error);
            });
    };
    //#endregion

    // #region change category
    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
        console.log(selectedCategory);
    };

    //update foods when category changes
    useEffect(() => {
        if (selectedCategory)
            dispatch(getFoods({ categoryId: selectedCategory, limit: 100 }));
        else dispatch(getFoods({ categoryId: '', limit: 100 }));
    }, [selectedCategory]);
    //#endregion

    return (
        <div>
            {!user ? (
                <LoginModal onLoginSuccess={onLoginSuccess} />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center mb-2">
                            <h2>Danh sách món của Bếp Iu</h2>
                        </div>
                        <div className="d-flex my-4 justify-content-between">
                            <div className="col-sm-4 col-lg-2">
                                <button
                                    className="btn btn-root btn-round"
                                    onClick={handleOpenAddModal}
                                >
                                    Thêm món
                                </button>
                            </div>
                            <div className="col-sm-6 col-lg-4 d-flex  align-items-center">
                                <label
                                    htmlFor="categoryId"
                                    className="w-100"
                                >
                                    Lọc theo danh mục:
                                </label>
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    value={selectedCategory}
                                    onChange={(e) => handleChangeCategory(e)}
                                >
                                    <option value={''}>Tất cả</option>
                                    {categories &&
                                        categories.length > 0 &&
                                        categories.map((cate) => (
                                            <option
                                                key={cate._id}
                                                value={cate._id}
                                            >
                                                {cate.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Món ăn</th>
                                    <th scope="col">Đầu bếp</th>
                                    <th scope="col">Danh mục</th>
                                    <th scope="col">Ngày đăng</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods && foods.length > 0 ? (
                                    foods.map((food, index) => (
                                        <tr key={food._id}>
                                            <th scope="row">{index + 1}</th>
                                            <th>
                                                <img
                                                    src={food.imageLink}
                                                    alt="Món ăn"
                                                    className="food-management-img"
                                                ></img>
                                            </th>
                                            <td>{food.name}</td>
                                            <td>{food.chef}</td>
                                            <td>{food.categoryId.name}</td>
                                            <td>
                                                {formatServeDate(
                                                    food.createdAt
                                                )}
                                            </td>
                                            <td>
                                                {/* edit button */}
                                                <Link
                                                    onClick={() =>
                                                        handleOpenEditModal(
                                                            food
                                                        )
                                                    }
                                                    className="user_link"
                                                >
                                                    <i
                                                        className="fa fa-edit text-success food-management-btn mr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                </Link>
                                                {/* delete button */}
                                                <Link
                                                    onClick={() =>
                                                        handleOpenDeleteModal(
                                                            food
                                                        )
                                                    }
                                                    className="user_link"
                                                >
                                                    <i
                                                        className="h1 fa fa-trash text-danger food-management-btn"
                                                        aria-hidden="true"
                                                    ></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan={8}>
                                            Không có sản phẩm nào bé ơi
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
            <ConfirmModal
                title={'Xóa món ăn!'}
                content={'Bạn có chắc chắn xóa?'}
                show={isDeleteModalShow}
                handleCloseModal={handleCloseDeleteModal}
                handleConfirmModal={handleConfirmDeleteModal}
                danger={true}
            />
            <EditFoodModal
                show={isEditModalShow}
                handleCloseModal={handleCloseEditModal}
                handleConfirmModal={handleConfirmEditModal}
                food={selectedFood}
                categories={categories}
            />
            <EditFoodModal
                show={isAddModalShow}
                handleCloseModal={handleCloseAddModal}
                handleConfirmModal={handleConfirmAddModal}
                isAddFood={true}
                categories={categories}
            />
        </div>
    );
};

export default AdminFood;
