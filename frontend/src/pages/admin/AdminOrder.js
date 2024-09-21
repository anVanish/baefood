import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/common/OrderItem';
import {
    deleteOrder,
    getOrders,
    setDoneOrder,
    setReadyOrder,
} from '../../slices/orderSlice';
import { closeModal, openModal } from '../../slices/loginModalSlice';
import LoginModal from '../../components/modal/LoginModal';
import { Link } from 'react-router-dom';
import { orderTabs } from '../../constants/orderTabs';
import ConfirmModal from '../../components/modal/ConfirmModal';

const AdminOrder = () => {
    const dispatch = useDispatch();
    const { orders, tabsInfo } = useSelector((state) => state.order);
    const [user, setUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    //modal
    const [isShowModal, setIsShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isDanger, setIsDanger] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [actionFunction, setActionFunction] = useState(null);

    //check if user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getOrders());
        } else {
            dispatch(openModal({ isAdmin: true }));
        }
    }, [dispatch]);

    //#region handle change tab
    const handleChangeTab = (e, tabIndex) => {
        e.preventDefault();
        setSelectedTab(tabIndex);
    };

    useEffect(() => {
        dispatch(getOrders({ tab: orderTabs[selectedTab].tab }));
    }, [dispatch, selectedTab]);
    //#endregion

    //#region handle with modal
    //handle confirm modal
    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleOpenModal = (
        actionFunction,
        orderId,
        title,
        content,
        danger = false
    ) => {
        setActionFunction(actionFunction);
        setOrderId(orderId);
        setTitle(title);
        setContent(content);
        setIsDanger(danger);
        setIsShowModal(true);
    };

    const handleConfirmModal = () => {
        const dispatchAction =
            actionFunction === 'delete'
                ? dispatch(deleteOrder({ orderId }))
                : actionFunction === 'ready'
                ? dispatch(setReadyOrder({ orderId }))
                : actionFunction === 'check'
                ? dispatch(setDoneOrder({ orderId }))
                : null;
        if (dispatchAction)
            dispatchAction
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        dispatch(getOrders());
                        setIsShowModal(false);
                    }
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                });
    };

    //#endregion

    console.log(orders);
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
                                {orders && orders.length === 0 && (
                                    <div className="col-sm-12 col-lg-12">
                                        <p className="text-center pt-4">
                                            Chưa có món nào bé ơi!!
                                        </p>
                                    </div>
                                )}
                                {orders &&
                                    orders.map((order) => (
                                        <OrderItem
                                            key={order._id}
                                            order={order}
                                            isAdmin={true}
                                            handleOpenModal={handleOpenModal}
                                        />
                                    ))}
                            </div>
                        </section>
                    </div>
                </section>
            )}
            <ConfirmModal
                show={isShowModal}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmModal}
                title={title}
                content={content}
                danger={isDanger}
            />
        </>
    );
};

export default AdminOrder;
