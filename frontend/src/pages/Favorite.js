import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';

const Favorite = () => {
    const foods = [{}, {}];

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Món tủ của Bé Iu</h2>
                </div>

                <div className="filters-content">
                    <div className="row grid">
                        {!foods ||
                            (foods.length === 0 && (
                                <div className="col-sm-10 col-lg-10">
                                    <p className="text-center pt-4">
                                        Chưa có món nào bé ơi!!
                                    </p>
                                </div>
                            ))}
                        {foods.map((food) => (
                            <FoodCard food={food} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Favorite;
