import React from 'react';
import { Link } from 'react-router-dom';
import FoodOrderItem from './FoodOrderItem';
import {
    formatServeDate,
    formatServeTimeToVN,
} from '../../utils/ServeDateFormat';

const OrderItem = ({ order }) => {
    return (
        <div className="col-sm-6 col-lg-4">
            <div className="box">
                <div>
                    <div className="d-flex justify-content-between order-box">
                        <h5 className="text-dark">
                            {formatServeTimeToVN(order.serveTime)},{' '}
                            {formatServeDate(order.serveDate)}
                        </h5>
                        {!order.isDone ? (
                            <Link
                                to=""
                                className="text-danger"
                            >
                                <i className="fa fa-trash"></i>
                            </Link>
                        ) : (
                            <Link
                                to=""
                                className="text-success"
                            >
                                Bếp đang chuẩn bị
                            </Link>
                        )}
                    </div>
                    {order.foodIds.map((food) => (
                        <FoodOrderItem food={food} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
