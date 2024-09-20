import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from '../components/common/FoodCard';
import { closeModal, openModal } from '../slices/loginModalSlice';

const Favorite = () => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);
    const [user, setUser] = useState(null);

    //check if user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !JSON.parse(storedUser).isAdmin) {
            setUser(JSON.parse(storedUser));
            dispatch(closeModal());
        } else {
            dispatch(openModal({ isAdmin: false }));
        }
    }, [dispatch]);

    return (
        <>
            {!user ? (
                <LoginModal />
            ) : (
                <section className="food_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Món tủ của Bé Iu</h2>
                        </div>

                        <div className="filters-content">
                            <div className="row grid">
                                {!wishlist ||
                                    (wishlist.length === 0 && (
                                        <div className="col-sm-12 col-lg-12">
                                            <p className="text-center pt-4">
                                                Chưa có món nào bé ơi!!
                                            </p>
                                        </div>
                                    ))}
                                {wishlist.map((food) => (
                                    <FoodCard
                                        key={food._id}
                                        food={food}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Favorite;
