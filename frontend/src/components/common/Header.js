import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../../assets/images/hero-bg.jpg';
import CartIcon from './CartIcon';

const Header = () => {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem('user'))
    );

    return (
        <div className="hero_area">
            <div className="bg-box">
                <img
                    src={heroBackground}
                    alt=""
                />
            </div>
            <header className="header_section">
                <div className="container">
                    {user && user.isAdmin ? (
                        <nav className="navbar navbar-expand-lg custom_nav-container justify-content-between">
                            <Link
                                className="navbar-brand"
                                to="/admin"
                            >
                                <span>Bếp Iu</span>
                            </Link>

                            {/* <!-- option  --> */}
                            <div
                                className=""
                                id=""
                            >
                                <div className="user_option">
                                    <Link className="user_link">
                                        Xin chào admin, {user.name}
                                    </Link>
                                    <Link
                                        to="/admin/orders"
                                        className="order_online"
                                    >
                                        Quản lý món
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    ) : (
                        <nav className="navbar navbar-expand-lg custom_nav-container justify-content-between">
                            <Link
                                className="navbar-brand"
                                to="/"
                            >
                                <span>Bếp Iu</span>
                            </Link>

                            {/* <!-- option  --> */}
                            <div
                                className=""
                                id=""
                            >
                                <div className="user_option">
                                    <Link
                                        to="/favorites"
                                        className="user_link"
                                    >
                                        <i
                                            className="fa fa-heart"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                    <Link
                                        className="cart_link"
                                        to="/carts"
                                    >
                                        <CartIcon />
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="order_online"
                                    >
                                        Lên món
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
