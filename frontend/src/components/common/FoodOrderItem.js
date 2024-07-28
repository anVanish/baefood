import React from 'react';

const FoodOrderItem = ({ food }) => {
    food.name = 'Banh Canh';
    food.chef = 'Khanh An';
    food.imageLink = 'link';

    return (
        <div className="d-flex flex-row align-items-center my-3">
            <div className="mx-3">
                <img
                    src={food.imageLink}
                    className="img-fluid rounded-3"
                    alt="order item"
                    style={{ width: '65px' }}
                />
            </div>
            <div className="ms-3">
                <h5>{food.name}</h5>
                <p className="small mb-0">{food.chef}</p>
            </div>
        </div>
    );
};

export default FoodOrderItem;
