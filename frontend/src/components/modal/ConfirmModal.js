import React from "react";
import Modal from "react-modal";
import { customStyles } from "../../constants/modal";

const ConfirmModal = ({
    show,
    title,
    content,
    handleConfirmModal,
    handleCloseModal,
    danger = false,
    loading = false,
}) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel={title}
        >
            <h2 className="mb-4">{title}</h2>
            <form>
                <div>
                    <div>
                        <p>{content}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-secondary btn-round mt-4 mr-4"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </button>
                    <button
                        className={
                            danger
                                ? "btn btn-danger btn-round mt-4"
                                : "btn btn-root btn-round mt-4"
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirmModal();
                        }}
                    >
                        {loading ? "Xác nhận..." : "Xác nhận"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ConfirmModal;
