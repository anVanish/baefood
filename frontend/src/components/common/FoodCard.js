import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import { addOrRemoveWishlist } from '../../slices/wishlistSlice';
import { addToCart, deleteFromCart } from '../../slices/cartSlice';

const FoodCard = ({ food, isCart }) => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);

    //check food in wishlist
    const [isFoodInWishlist, setIsFoodInWishlist] = useState(
        wishlist.some((item) => item && item._id === food._id)
    );

    //add to wish list
    const handleAddToWishlist = (food) => {
        dispatch(addOrRemoveWishlist(food));
    };

    //check wishlist when wishlist change
    useEffect(() => {
        setIsFoodInWishlist(
            wishlist.some((item) => item && item._id === food._id)
        );
    }, [wishlist, food._id]);

    //add to cart
    const handleAddToCart = (foodId) => {
        dispatch(addToCart({ foodId }));
    };

    //delete from cart
    const handleDeleteFromCart = (foodId) => {
        dispatch(deleteFromCart({ foodId }));
    };

    return (
        <div className="col-sm-6 col-lg-4">
            <div className="box">
                <div>
                    <div className="img-box">
                        <img
                            src={food.imageLink}
                            alt="Món ăn"
                        />
                    </div>
                    <div className="detail-box">
                        <h5>{food.name}</h5>
                        <p>{food.description}</p>
                        <div className="options">
                            <h6>{food.chef}</h6>
                            <div className="d-flex">
                                <Link
                                    onClick={() => handleAddToWishlist(food)}
                                    className="text-white mr-2"
                                >
                                    <i
                                        className={`fa fa-heart
                                            ${
                                                isFoodInWishlist
                                                    ? 'text-danger'
                                                    : ''
                                            }
                                        `}
                                        // className="fa fa-heart"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                                {isCart ? (
                                    <Link
                                        onClick={() =>
                                            handleDeleteFromCart(food._id)
                                        }
                                        className="bg-danger"
                                    >
                                        <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                ) : (
                                    <Link
                                        onClick={() =>
                                            handleAddToCart(food._id)
                                        }
                                    >
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
