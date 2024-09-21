import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../components/common/OrderItem';
import { getOrders } from '../slices/orderSlice';
import { closeModal, openModal } from '../slices/loginModalSlice';
import LoginModal from '../components/modal/LoginModal';
import { Link } from 'react-router-dom';
import { orderTabs } from '../constants/orderTabs';

const Order = () => {
    const dispatch = useDispatch();
    const { orders, tabsInfo } = useSelector((state) => state.order);
    const [user, setUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    //check if user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getOrders());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    //handle change tab
    const handleChangeTab = (e, tabIndex) => {
        e.preventDefault();
        setSelectedTab(tabIndex);
    };

    useEffect(() => {
        dispatch(getOrders({ tab: orderTabs[selectedTab].tab }));
    }, [dispatch, selectedTab]);

    return (
        <>
            {!user ? (
                <LoginModal />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Yêu cầu lên món</h2>
                        </div>
                        <div className="d-flex my-4">
                            <ul className="nav nav-tabs w-100">
                                {orderTabs.map((tab, index) => (
                                    <li
                                        key={index}
                                        className="nav-item flex-fill"
                                    >
                                        <Link
                                            onClick={(e) =>
                                                handleChangeTab(e, index)
                                            }
                                            className={
                                                index === selectedTab
                                                    ? 'nav-link text-primary text-center active'
                                                    : 'nav-link text-dark text-center'
                                            }
                                        >
                                            {tab.text} (
                                            {(tabsInfo && tabsInfo[tab.tab]) ||
                                                0}
                                            )
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <section>
                            <div className="row grid">
                                {orders.length === 0 && (
                                    <div className="col-sm-12 col-lg-12">
                                        <p className="text-center pt-4">
                                            Chưa có món nào bé ơi!!
                                        </p>
                                    </div>
                                )}
                                {orders.map((order) => (
                                    <OrderItem
                                        key={order._id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            )}
        </>
    );
};

export default Order;
