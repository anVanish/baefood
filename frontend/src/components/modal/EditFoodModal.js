import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../constants/modal';

const EditFoodModal = ({
    show,
    handleConfirmModal,
    handleCloseModal,
    food,
}) => {
    const [name, setName] = useState(food && food.name);
    const [description, setDescription] = useState(food && food.description);
    const [chef, setChef] = useState(food && food.chef);
    const [imageLink, setImageLink] = useState(food && food.imageLink);

    useEffect(() => {
        setName(food && food.name);
        setChef(food && food.chef);
        setDescription(food && food.description);
        setImageLink(food && food.imageLink);
    }, [food]);

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel={'Edit Food Modal'}
        >
            <h2 className="mb-4">Cập nhật tên món</h2>
            <form>
                <div>
                    <label htmlFor="name">Tên món</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control mb-3"
                        placeholder="Tên món..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="chef">Đầu bếp</label>
                    <input
                        id="chef"
                        name="chef"
                        className="form-control mb-3"
                        placeholder="Đầu bếp..."
                        value={chef}
                        onChange={(e) => setChef(e.target.value)}
                    />
                    <label htmlFor="description">Mô tả</label>
                    <input
                        id="description"
                        name="description"
                        className="form-control mb-3"
                        placeholder="Mô tả..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor="img">Link ảnh</label>
                    <input
                        id="img"
                        name="img"
                        className="form-control mb-3"
                        placeholder="Link ảnh..."
                        value={imageLink}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-secondary btn-round mt-4 mr-4"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </button>
                    <button
                        className="btn btn-success btn-round mt-4"
                        onClick={() =>
                            handleConfirmModal(name, description, chef)
                        }
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditFoodModal;
