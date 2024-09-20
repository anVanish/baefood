import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../../components/common/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../slices/loginModalSlice';
import LoginModal from '../../components/modal/LoginModal';
import { getFoods } from '../../slices/foodSlice';
import { getCategories } from '../../slices/categorySlice';
import { formatServeDate } from '../../utils/ServeDateFormat';
import ConfirmModal from '../../components/modal/ConfirmModal';

const AdminFood = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isModalShow, setIsModalShow] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    //get foods
    const {
        foods,
        page,
        total,
        loading: foodLoading,
        error: foodError,
    } = useSelector((state) => state.food);
    //get categories
    const { categories } = useSelector((state) => state.category);

    //initial data load
    const initData = () => {
        dispatch(getFoods({ categoryId: '', page: 0 }));
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

    //handle delete food modal action
    const handleOpenDeleteModal = (foodId) => {
        setIsModalShow(true);
        setSelectedFood(foodId);
    };

    const handleCloseDeleteModal = () => {
        setIsModalShow(false);
        setSelectedFood(null);
    };

    const handleConfirmDeleteModal = () => {
        alert(`Success ${selectedFood}`);
        setIsModalShow(false);
    };

    return (
        <div>
            {!user ? (
                <LoginModal onLoginSuccess={onLoginSuccess} />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Menu Bếp Iu</h2>
                        </div>
                        <table class="table">
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
                                {foods.map((food, index) => (
                                    <tr>
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
                                            {formatServeDate(food.createdAt)}
                                        </td>
                                        <td>
                                            {/* edit button */}
                                            <Link className="user_link">
                                                <i
                                                    className="fa fa-edit text-success food-management-btn mr-3"
                                                    aria-hidden="true"
                                                ></i>
                                            </Link>
                                            {/* delete button */}
                                            <Link
                                                onClick={() =>
                                                    handleOpenDeleteModal(
                                                        food._id
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
            <ConfirmModal
                title={'Xóa món ăn!'}
                content={'Bạn có chắc chắn xóa?'}
                show={isModalShow}
                handleCloseModal={handleCloseDeleteModal}
                handleConfirmModal={handleConfirmDeleteModal}
                danger={true}
            />
        </div>
    );
};

export default AdminFood;
