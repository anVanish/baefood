import React from 'react';
import OrderItem from '../components/common/OrderItem';

const Order = () => {
    const orders = [{}, {}];

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Yêu cầu lên món</h2>
                </div>

                <section>
                    <div className="row grid">
                        {!orders ||
                            (orders.length === 0 && (
                                <div className="col-sm-10 col-lg-10">
                                    <p className="text-center pt-4">
                                        Chưa có món nào bé ơi!!
                                    </p>
                                </div>
                            ))}
                        {orders.map((order) => (
                            <OrderItem order={order} />
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Order;
