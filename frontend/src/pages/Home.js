import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    const [activeCategory, setActiveCategory] = useState(-1);

    const categories = ['Canh', 'Chiên', 'Xào', 'Hấp', 'Nước', 'Khác'];
    const foods = [{}, {}, {}, {}, {}];

    const filterByCategory = (id) => {
        setActiveCategory(id);
    };

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Menu Bếp Iu</h2>
                </div>

                <ul className="filters_menu">
                    <li
                        className={activeCategory === -1 ? 'active' : ''}
                        onClick={() => filterByCategory(-1)}
                    >
                        Tất cả
                    </li>
                    {categories.map((cate, index) => (
                        <li
                            key={index}
                            className={activeCategory === index ? 'active' : ''}
                            onClick={() => filterByCategory(index)}
                        >
                            {cate}
                        </li>
                    ))}
                </ul>

                <div className="filters-content">
                    <div className="row grid">
                        {foods.map((food) => (
                            <FoodCard food={food} />
                        ))}
                    </div>
                </div>
                <div className="btn-box">
                    <Link to="">Xem thêm</Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
