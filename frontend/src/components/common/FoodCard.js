import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

const FoodCard = ({ food, isCart }) => {
    return (
        <div className="col-sm-6 col-lg-4">
            <div className="box">
                <div>
                    <div className="img-box">
                        <img
                            src=""
                            alt=""
                        />
                    </div>
                    <div className="detail-box">
                        <h5>{food.name}</h5>
                        <p>{food.description}</p>
                        <div className="options">
                            <h6>{food.chef}</h6>
                            <div className="d-flex">
                                <Link
                                    to=""
                                    className="text-white mr-2"
                                >
                                    <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                                {isCart ? (
                                    <Link
                                        to=""
                                        className="bg-danger"
                                    >
                                        <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                ) : (
                                    <Link to="">
                                        <CartIcon />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
