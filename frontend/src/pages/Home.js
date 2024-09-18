import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../slices/loginModalSlice';
import LoginModal from '../components/common/LoginModal';
import { getFoods } from '../slices/foodSlice';
import { getCategories } from '../slices/categorySlice';

const Home = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const {
        foods,
        loading: foodLoading,
        error: foodError,
    } = useSelector((state) => state.food);
    const { categories } = useSelector((state) => state.category);

    //init data
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getFoods(''));
            dispatch(getCategories());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    const [activeCategory, setActiveCategory] = useState('');

    const filterByCategory = (categoryId) => {
        dispatch(getFoods({ categoryId })); //dispatch to get foods by category id
        setActiveCategory(categoryId);
    };

    return (
        <div>
            {!user ? (
                <LoginModal />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Menu Bếp Iu</h2>
                        </div>

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

                        <div className="filters-content">
                            <div className="row grid">
                                {foodLoading ? (
                                    <p>Loading...</p>
                                ) : foodError ? (
                                    <p style={{ color: 'red' }}>{foodError}</p>
                                ) : (
                                    foods.map((food, index) => (
                                        <FoodCard
                                            key={index}
                                            food={food}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="btn-box">
                            <Link to="">Xem thêm</Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
