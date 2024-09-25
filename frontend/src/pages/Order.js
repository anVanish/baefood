import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../components/common/OrderItem";
import { closeModal, openModal } from "../slices/loginModalSlice";
import LoginModal from "../components/modal/LoginModal";
import { Link } from "react-router-dom";
import { orderTabs } from "../constants/orderTabs";
import { deleteOrder, getOrders, reOrder } from "../slices/orderSlice";
import ConfirmModal from "../components/modal/ConfirmModal";
import OrderOptionModal from "../components/modal/OrderOptionModal";
import { formatServeDate, formatServeTimeToVN } from "../utils/ServeDateFormat";

const Order = () => {
    const dispatch = useDispatch();
    const { orders, tabsInfo } = useSelector((state) => state.order);
    const [user, setUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    //modal
    const [isShowModal, setIsShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isDanger, setIsDanger] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [actionFunction, setActionFunction] = useState(null);

    //re-order modal
    const [isShowReOrderModal, setIsShowReOrderModal] = useState(false);
    const [serveDate, setServeDate] = useState(null);
    const [serveTime, setServeTime] = useState("");
    const [note, setNote] = useState("");

    //check if user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && !JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
            dispatch(getOrders());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    //on login success
    const onLoginSuccess = () => {
        const storedUser = localStorage.getItem("user");
        setUser(JSON.parse(storedUser));
        dispatch(closeModal());
        dispatch(getOrders());
    };

    //handle change tab
    const handleChangeTab = (e, tabIndex) => {
        e.preventDefault();
        setSelectedTab(tabIndex);
    };

    useEffect(() => {
        dispatch(getOrders({ tab: orderTabs[selectedTab].tab }));
    }, [dispatch, selectedTab]);

    //#region handle with modal [confirm]
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
            actionFunction === "delete"
                ? dispatch(deleteOrder({ orderId }))
                : actionFunction === "reorder"
                ? dispatch(reOrder({ orderId, serveDate, serveTime, note }))
                : null;
        dispatchAction &&
            dispatchAction
                .then((response) => {
                    if (response.meta.requestStatus === "fulfilled") {
                        dispatch(
                            getOrders({ tab: orderTabs[selectedTab].tab })
                        );
                        setIsShowModal(false);
                        setNote("");
                        setServeDate(null);
                        setServeTime("");
                        setOrderId("");
                    }
                })
                .catch((error) => {
                    console.error("error:", error);
                });
    };

    //#endregion

    //#region re order modal
    //submit modal
    const handleSubmitReOrderModal = ({ serveDate, serveTime, note }) => {
        // alert(`${serveDate}, ${serveTime}, ${note}`);
        setServeDate(serveDate);
        setServeTime(serveTime);
        setNote(note);
        handleOpenModal(
            "reorder",
            orderId,
            `Đặt lại đơn`,
            `Đặt lại vào ${formatServeTimeToVN(serveTime)} ${formatServeDate(
                serveDate
            )} nhé?`
        );
    };

    //close modal
    const handleCloseReOrderModal = () => {
        setIsShowReOrderModal(false);
    };

    //open modal
    const handleOpenReOrderModal = (orderId) => {
        setOrderId(orderId);
        setIsShowReOrderModal(true);
    };

    //#endregion

    return (
        <>
            {!user ? (
                <LoginModal onLoginSuccess={onLoginSuccess} />
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
                                                    ? "nav-link text-primary text-center active"
                                                    : "nav-link text-dark text-center"
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
                                        handleOpenModal={handleOpenModal}
                                        handleOpenReOrderModal={
                                            handleOpenReOrderModal
                                        }
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
            <OrderOptionModal
                show={isShowReOrderModal}
                handleSubmit={handleSubmitReOrderModal}
                handleClose={handleCloseReOrderModal}
            />
        </>
    );
};

export default Order;
