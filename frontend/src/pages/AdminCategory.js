import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../slices/loginModalSlice";
import LoginModal from "../components/modal/LoginModal";
import {
    getCategories,
    updateCategory,
    deleteCategory,
    addCategory,
} from "../slices/categorySlice";
import ConfirmModal from "../components/modal/ConfirmModal";
import EditCategoryModal from "../components/modal/EditCategoryModal";

const AdminFood = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
    const [isEditModalShow, setIsEditModalShow] = useState(false);
    const [isAddModalShow, setIsAddModalShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    //get categories
    const { categories } = useSelector((state) => state.category);

    //initial data load
    const initData = useCallback(() => {
        dispatch(getCategories());
    }, [dispatch]);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            initData();
        } else {
            dispatch(openModal({ isAdmin: true }));
        }
    }, [dispatch, initData]);

    //on login success
    const onLoginSuccess = () => {
        const storedUser = localStorage.getItem("user");
        setUser(JSON.parse(storedUser));
        dispatch(closeModal());
        initData();
    };

    // #region handle delete category modal action
    const handleOpenDeleteModal = (category) => {
        setIsDeleteModalShow(true);
        setSelectedCategory(category);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalShow(false);
        setSelectedCategory(null);
    };

    const handleConfirmDeleteModal = () => {
        dispatch(deleteCategory({ categoryId: selectedCategory._id }))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    setIsDeleteModalShow(false);
                    dispatch(getCategories());
                }
            })
            .catch((error) => {
                console.error("Deleted failed:", error);
            });
    };
    //#endregion

    // #region handle add category modal action
    const handleOpenAddModal = () => {
        setIsAddModalShow(true);
        setSelectedCategory();
    };

    const handleCloseAddModal = () => {
        setIsAddModalShow(false);
        setSelectedCategory(null);
    };

    const handleConfirmAddModal = (name) => {
        const category = { name };
        dispatch(addCategory({ category }))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    setIsAddModalShow(false);
                    dispatch(getCategories());
                }
            })
            .catch((error) => {
                console.error("Added failed:", error);
            });
    };
    //#endregion

    // #region handle edit food modal action
    const handleOpenEditModal = (category) => {
        setIsEditModalShow(true);
        setSelectedCategory(category);
    };

    const handleCloseEditModal = () => {
        setIsEditModalShow(false);
        setSelectedCategory(null);
    };

    const handleConfirmEditModal = (name) => {
        const category = {
            _id: selectedCategory._id,
            name,
        };
        dispatch(updateCategory({ category }))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    setIsEditModalShow(false);
                    dispatch(getCategories());
                }
            })
            .catch((error) => {
                console.error("Updated failed:", error);
            });
    };
    //#endregion

    //#endregion

    return (
        <div>
            {!user ? (
                <LoginModal onLoginSuccess={onLoginSuccess} />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center mb-2">
                            <h2>Danh mục món của Bếp Iu</h2>
                        </div>
                        <div className="d-flex my-4 justify-content-between">
                            <div className="col-sm-4 col-lg-2">
                                <button
                                    className="btn btn-root btn-round"
                                    onClick={handleOpenAddModal}
                                >
                                    Thêm danh mục
                                </button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Danh mục</th>
                                    <th scope="col">Số lượng món</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length > 0 ? (
                                    categories.map((cate, index) => (
                                        <tr key={cate._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{cate.name}</td>
                                            <td>{cate.foodCount}</td>
                                            {cate.isOther ? (
                                                <td></td>
                                            ) : (
                                                <td>
                                                    {/* edit button */}
                                                    <Link
                                                        onClick={() =>
                                                            handleOpenEditModal(
                                                                cate
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
                                                                cate
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
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan={8}>Danh mục trống</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
            <ConfirmModal
                title={`Xóa danh mục ${
                    selectedCategory && selectedCategory.name
                }`}
                content={`Bạn có chắc chắn xóa?`}
                show={isDeleteModalShow}
                handleCloseModal={handleCloseDeleteModal}
                handleConfirmModal={handleConfirmDeleteModal}
                danger={true}
            />
            <EditCategoryModal
                show={isEditModalShow}
                handleCloseModal={handleCloseEditModal}
                handleConfirmModal={handleConfirmEditModal}
                category={selectedCategory}
            />
            <EditCategoryModal
                show={isAddModalShow}
                handleCloseModal={handleCloseAddModal}
                handleConfirmModal={handleConfirmAddModal}
                isAddCategory={true}
            />
        </div>
    );
};

export default AdminFood;
