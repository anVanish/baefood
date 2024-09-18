import React from 'react';
import { useSelector } from 'react-redux';
import FoodCard from '../components/common/FoodCard';

const Favorite = () => {
    const { wishlist } = useSelector((state) => state.wishlist);

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Món tủ của Bé Iu</h2>
                </div>

                <div className="filters-content">
                    <div className="row grid">
                        {!wishlist ||
                            (wishlist.length === 0 && (
                                <div className="col-sm-10 col-lg-10">
                                    <p className="text-center pt-4">
                                        Chưa có món nào bé ơi!!
                                    </p>
                                </div>
                            ))}
                        {wishlist.map((food) => (
                            <FoodCard
                                key={food._id}
                                food={food}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Favorite;
