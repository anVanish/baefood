import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/common/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../slices/loginModalSlice';
import LoginModal from '../components/modal/LoginModal';
import { getCart } from '../slices/cartSlice';
import OrderOptionModal from '../components/modal/OrderOptionModal';
import { addOrder } from '../slices/orderSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { carts } = useSelector((state) => state.cart);
    const [user, setUser] = useState(null);
    const [isModalShow, setIsModalShow] = useState(false);

    //check if user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getCart());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    //on login success
    const onLoginSuccess = () => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
        dispatch(closeModal());
        dispatch(getCart());
    };

    //open order option modal
    const handleModalOpen = () => {
        setIsModalShow(true);
    };

    //close order option modal
    const handleModalClose = () => {
        setIsModalShow(false);
    };

    //submit order options
    const handleModalSubmit = ({ serveDate, serveTime, note }) => {
        dispatch(addOrder({ serveDate, serveTime, note }))
            .unwrap()
            .then(() => {
                dispatch(getCart());
            })
            .catch((error) => {
                console.error('Order submission failed:', error);
            });
    };

    return (
        <>
            {!user ? (
                <LoginModal onLoginSuccess={onLoginSuccess} />
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
                                <Link onClick={handleModalOpen}>Lên món</Link>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <OrderOptionModal
                show={isModalShow}
                handleClose={handleModalClose}
                handleSubmit={handleModalSubmit}
            />
        </>
    );
};

export default Cart;
