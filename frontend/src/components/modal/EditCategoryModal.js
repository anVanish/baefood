import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../constants/modal";

const EditCategoryModal = ({
    show,
    handleConfirmModal,
    handleCloseModal,
    category,
    isAddCategory = false,
}) => {
    const [name, setName] = useState(
        isAddCategory ? "" : category && category.name
    );

    useEffect(() => {
        if (!isAddCategory && category) {
            setName(category.name);
        }
    }, [category, isAddCategory]);

    const handleCancelButton = (e) => {
        e.preventDefault();
        handleCloseModal();
    };

    const handleConfirmButton = (e) => {
        e.preventDefault();
        handleConfirmModal(name);
        setName("");
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel={"Edit Category Modal"}
        >
            <h2 className="mb-4">
                {isAddCategory ? "Thêm danh mục" : "Cập nhật danh mục"}
            </h2>
            <form autoComplete="off">
                <div>
                    <label htmlFor="name">Tên danh mục</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control mb-3"
                        placeholder="Tên danh mục..."
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-success btn-round mt-4 mr-4"
                        onClick={(e) => handleConfirmButton(e)}
                    >
                        {isAddCategory ? "Thêm danh mục" : "Cập nhật danh mục"}
                    </button>
                    <button
                        className="btn btn-secondary btn-round mt-4"
                        onClick={(e) => handleCancelButton(e)}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditCategoryModal;
