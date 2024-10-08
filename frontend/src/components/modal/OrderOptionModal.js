import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { getServeTime } from "../../slices/orderSlice";
import { formatServeTimeToVN } from "../../utils/ServeDateFormat";
import { customStyles } from "../../constants/modal";

const OrderModal = ({ show, handleClose, handleSubmit }) => {
    const dispatch = useDispatch();
    const [day, setDay] = useState(0);
    const { availableTimes } = useSelector((state) => state.order);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [note, setNote] = useState("");

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

    //handle change note
    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    //handle submit
    const handleSubmitModal = (e) => {
        e.preventDefault();
        handleSubmit({
            serveDate: selectedDate,
            serveTime: selectedTime,
            note,
        });
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
            <form autoComplete="off">
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
                                        <option key={index} value={key}>
                                            {formatServeTimeToVN(key)}
                                        </option>
                                    )
                                )
                            ) : (
                                <option>Cuối ngày òi bé ơi</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="note">Ghi chú</label>
                        <input
                            id="note"
                            name="note"
                            className="form-control mb-3"
                            placeholder="Ghi chú..."
                            onChange={(e) => handleChangeNote(e)}
                        />
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
