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
        page,
        total,
        loading: foodLoading,
        error: foodError,
    } = useSelector((state) => state.food);
    const { categories } = useSelector((state) => state.category);
    const [activeCategory, setActiveCategory] = useState('');

    const [displayedFoods, setDisplayedFoods] = useState([]);

    //init data
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getFoods({ categoryId: '', page: 0 }));
            dispatch(getCategories());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    //update displayed foods
    useEffect(() => {
        setDisplayedFoods([...displayedFoods, ...foods]);
    }, [foods, dispatch]);

    //filter foods by category
    const filterByCategory = (categoryId) => {
        setDisplayedFoods([]);
        setActiveCategory(categoryId);
        dispatch(getFoods({ categoryId, page: 0 })); //dispatch to get foods by category id
    };

    //view more button
    const viewMore = () => {
        dispatch(getFoods({ page: page + 1, categoryId: activeCategory }));
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
