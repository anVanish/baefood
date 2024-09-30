import React from "react";
import { Link } from "react-router-dom";
import FoodOrderItem from "./FoodOrderItem";
import {
    formatServeDate,
    formatServeTimeToVN,
} from "../../utils/ServeDateFormat";

const OrderItem = ({
    order,
    isAdmin = false,
    handleOpenModal,
    handleOpenReOrderModal,
}) => {
    const handleDeleteAction = (orderId) => {
        handleOpenModal(
            "delete",
            orderId,
            "Xóa yêu cầu",
            "Bạn có chắc chắn xóa?",
            true
        );
    };
    const handelReadyAction = (orderId) => {
        handleOpenModal(
            "ready",
            orderId,
            "Xác nhận yêu cầu",
            "Bạn sẵn sàng làm món chưa"
        );
    };
    const handelCheckAction = (orderId) => {
        handleOpenModal(
            "check",
            orderId,
            "Hoàn thành món",
            "Món ăn đã hoàn tất chứ?"
        );
    };

    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="box h-100">
                <div>
                    <div className="d-flex justify-content-between order-box">
                        <h5 className="text-dark m-0">
                            {formatServeTimeToVN(order.serveTime)},{" "}
                            {formatServeDate(order.serveDate)}
                        </h5>
                        <div>
                            {order.isDone ? (
                                <Link className="text-success">Hoàn tất</Link>
                            ) : order.isExpired ? (
                                <Link className="text-danger">Hết hạn</Link>
                            ) : order.isReady ? (
                                <Link
                                    className="text-success"
                                    onClick={() =>
                                        isAdmin && handelCheckAction(order._id)
                                    }
                                >
                                    {isAdmin ? (
                                        <i className="fa fa-check"></i>
                                    ) : (
                                        "Đang lên món"
                                    )}
                                </Link>
                            ) : isAdmin ? (
                                <Link
                                    className="text-success"
                                    onClick={() => handelReadyAction(order._id)}
                                >
                                    <i className="fa fa-hourglass-start"></i>
                                </Link>
                            ) : (
                                <Link
                                    onClick={() =>
                                        handleDeleteAction(order._id)
                                    }
                                    className="text-danger ml-2"
                                >
                                    <i className="fa fa-trash"></i>
                                </Link>
                            )}

                            {isAdmin && (
                                <Link
                                    onClick={() =>
                                        handleDeleteAction(order._id)
                                    }
                                    className="text-danger ml-2"
                                >
                                    <i className="fa fa-trash"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                    {order.foodIds.map((food) => (
                        <FoodOrderItem key={food._id} food={food} />
                    ))}
                    <div className="d-flex mx-3 mt-2">
                        <h6>note: {order.note}</h6>
                    </div>
                    {!isAdmin && (order.isDone || order.isExpired) && (
                        <div className="text-center mt-3">
                            <Link
                                className="btn btn-root"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOpenReOrderModal(order._id);
                                }}
                            >
                                Đặt lại món
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
