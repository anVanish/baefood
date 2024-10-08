import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../slices/loginModalSlice';
import LoginModal from '../components/modal/LoginModal';
import { getFoods } from '../slices/foodSlice';
import { getCategories } from '../slices/categorySlice';

const Home = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const {
        foods,
        page,
        total,
        loading: foodLoading,
        error: foodError,
    } = useSelector((state) => state.food);
    const { categories } = useSelector((state) => state.category);

    const [activeCategory, setActiveCategory] = useState('');
    const [displayedFoods, setDisplayedFoods] = useState([]);

    // Initial data load
    const initData = () => {
        setDisplayedFoods([]);
        dispatch(getFoods({ categoryId: '', page: 0 }));
        dispatch(getCategories());
    };

    useEffect(() => {
        //check if user logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser && !JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            initData();
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    //on login success
    const onLoginSuccess = () => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
        dispatch(closeModal());
        initData();
    };

    //update displayed foods
    useEffect(() => {
        if (parseInt(page, 10) === 0) {
            setDisplayedFoods(foods);
        } else {
            setDisplayedFoods((prevFoods) => [...prevFoods, ...foods]);
        }
    }, [foods, page]);

    // Filter foods by category
    const filterByCategory = (categoryId) => {
        setDisplayedFoods([]); // Reset displayed foods when category changes
        setActiveCategory(categoryId);
        dispatch(getFoods({ categoryId, page: 0 }));
    };

    // View more button handler
    const viewMore = () => {
        dispatch(getFoods({ page: page + 1, categoryId: activeCategory }));
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
                        {/* load category */}
                        <ul className="filters_menu">
                            <li
                                className={
                                    activeCategory === '' ? 'active' : ''
                                }
                                onClick={() => filterByCategory('')}
                            >
                                Tất cả
                            </li>
                            {categories.map((cate) => (
                                <li
                                    key={cate._id}
                                    className={
                                        activeCategory === cate._id
                                            ? 'active'
                                            : ''
                                    }
                                    onClick={() => filterByCategory(cate._id)}
                                >
                                    {cate.name}
                                </li>
                            ))}
                        </ul>
                        {/* load food  */}
                        <div className="filters-content">
                            <div className="row grid">
                                {foodLoading ? (
                                    <p>Loading...</p>
                                ) : foodError ? (
                                    <p style={{ color: 'red' }}>{foodError}</p>
                                ) : displayedFoods.length === 0 ? (
                                    <div className="col-sm-12 col-lg-12">
                                        <p className="text-center pt-4">
                                            Chưa có món nào bé ơi!!
                                        </p>
                                    </div>
                                ) : (
                                    displayedFoods.map((food) => (
                                        <FoodCard
                                            key={food._id}
                                            food={food}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        {displayedFoods.length < total && (
                            <div className="btn-box">
                                <Link onClick={viewMore}>Xem thêm</Link>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
