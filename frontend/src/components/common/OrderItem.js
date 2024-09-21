import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FoodOrderItem from './FoodOrderItem';
import {
    formatServeDate,
    formatServeTimeToVN,
} from '../../utils/ServeDateFormat';
import { deleteOrder } from '../../slices/orderSlice';

const OrderItem = ({ order }) => {
    const dispatch = useDispatch();

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder({ orderId }));
    };

    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="box h-100">
                <div>
                    <div className="d-flex justify-content-between order-box">
                        <h5 className="text-dark">
                            {formatServeTimeToVN(order.serveTime)},{' '}
                            {formatServeDate(order.serveDate)}
                        </h5>
                        {order.isDone ? (
                            <Link className="text-success">Hoàn tất</Link>
                        ) : order.isExpired ? (
                            <Link className="text-danger">Hết hạn</Link>
                        ) : order.isReady ? (
                            <Link className="text-root"> Đang lên món</Link>
                        ) : (
                            <Link
                                onClick={() => handleDeleteOrder(order._id)}
                                className="text-danger"
                            >
                                <i className="fa fa-trash"></i>
                            </Link>
                        )}
                    </div>
                    {order.foodIds.map((food) => (
                        <FoodOrderItem
                            key={food._id}
                            food={food}
                        />
                    ))}
                    <div className="d-flex mx-3 mt-2">
                        <h6>note: {order.note}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
