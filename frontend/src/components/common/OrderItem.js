import React from 'react';
import { Link } from 'react-router-dom';
import FoodOrderItem from './FoodOrderItem';

const OrderItem = ({ order }) => {
    order.serveTime = 'Buoi trua';
    order.serveDate = '22/02/2022';
    order.isDone = false;
    order.foodId = [{}, {}];

    return (
        <div className="col-sm-6 col-lg-4">
            <div className="box">
                <div>
                    {/* <!-- order title --> */}
                    <div className="d-flex justify-content-between order-box">
                        <h5 className="text-dark">
                            {order.serveTime}, {order.serveDate}
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
                    {/* <!-- end order title --> */}
                    {/* <!-- menu --> */}

                    {order.foodId.map((food) => (
                        <FoodOrderItem food={food} />
                    ))}

                    {/* <!-- end menu --> */}
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
