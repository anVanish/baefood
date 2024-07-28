import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';

const Cart = () => {
    const carts = [{}, {}];

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Giỏ hàng Bé Iu</h2>
                </div>

                <div className="filters-content">
                    <div className="row grid">
                        {!carts ||
                            (carts.length === 0 && (
                                <div className="col-sm-10 col-lg-10">
                                    <p className="text-center pt-4">
                                        Chưa có món nào bé ơi!!
                                    </p>
                                </div>
                            ))}
                        {carts.map((cart) => (
                            <FoodCard
                                food={cart}
                                isCart={true}
                            />
                        ))}
                    </div>
                </div>
                <div className="btn-box">
                    <Link to="">Lên món</Link>
                </div>
            </div>
        </section>
    );
};

export default Cart;
