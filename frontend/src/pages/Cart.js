import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../slices/loginModalSlice';
import LoginModal from '../components/common/LoginModal';
import { getCart } from '../slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { carts } = useSelector((state) => state.cart);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getCart());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    return (
        <>
            {!user ? (
                <LoginModal />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Giỏ hàng Bé Iu</h2>
                        </div>

                        <div className="filters-content">
                            <div className="row grid">
                                {!carts ||
                                    (carts.length === 0 && (
                                        <div className="col-sm-12 col-lg-12">
                                            <p className="text-center pt-4">
                                                Chưa có món nào bé ơi!!
                                            </p>
                                        </div>
                                    ))}
                                {carts.map((cart) => (
                                    <FoodCard
                                        key={cart._id}
                                        food={cart.foodId}
                                        isCart={true}
                                    />
                                ))}
                            </div>
                        </div>
                        {carts.length > 0 && (
                            <div className="btn-box">
                                <Link to="">Lên món</Link>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
