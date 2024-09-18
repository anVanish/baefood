import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getServeTime } from '../../slices/orderSlice';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#222831',
        color: '#fff',
    },
};

const OrderModal = ({ show, handleClose, handleSubmit }) => {
    const dispatch = useDispatch();
    const [day, setDay] = useState(0);
    const { availableTimes } = useSelector((state) => state.order);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    //translate to Vietnamese to display on page
    const timeToVN = {
        breakfast: 'Buổi sáng',
        lunch: 'Buổi trưa',
        dinner: 'Buổi tối',
    };

    //trigger when day changes
    useEffect(() => {
        dispatch(getServeTime({ day }));
    }, [day, dispatch]);

    //set selected time by first available time
    useEffect(() => {
        if (availableTimes) {
            const firstTime = Object.keys(availableTimes)[0];
            const firstDate = Object.values(availableTimes)[0];
            setSelectedTime(firstTime);
            setSelectedDate(firstDate);
        }
    }, [availableTimes]);

    //handle day change
    const handleChangeDay = (e) => {
        setDay(Number(e.target.value));
    };

    //handle change time
    const handleChangeTime = (e) => {
        const selectedTimeKey = e.target.value;
        setSelectedTime(selectedTimeKey);
        setSelectedDate(availableTimes[selectedTimeKey]);
    };

    //handle submit
    const handleSubmitModal = (e) => {
        e.preventDefault();
        handleSubmit({ serveDate: selectedDate, serveTime: selectedTime });
        handleClose();
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleClose}
            style={customStyles}
            contentLabel="Order Modal"
        >
            <h2 className="mb-4">Bé muốn khi nào ăn</h2>
            {/* <h2 className="mb-4">Đăng nhập nào</h2> */}
            <form>
                <div>
                    <div>
                        <label htmlFor="day">Ngày: </label>
                        <select
                            id="day"
                            name="day"
                            value={day}
                            onChange={handleChangeDay}
                        >
                            <option value={0}>Hôm nay</option>
                            <option value={1}>Ngày mai</option>
                            <option value={2}>Ngày mốt</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="time">Buổi: </label>
                        <select
                            id="time"
                            name="time"
                            disabled={!availableTimes}
                            onChange={handleChangeTime}
                            value={selectedTime}
                        >
                            {availableTimes ? (
                                Object.keys(availableTimes).map(
                                    (key, index) => (
                                        <option
                                            key={index}
                                            value={key}
                                        >
                                            {timeToVN[key]}
                                        </option>
                                    )
                                )
                            ) : (
                                <option>Cuối ngày òi bé ơi</option>
                            )}
                        </select>
                    </div>
                </div>

                <button
                    className="btn btn-root btn-block btn-round mt-4"
                    onClick={handleSubmitModal}
                >
                    Lên Món
                </button>
            </form>
        </Modal>
    );
};

export default OrderModal;
