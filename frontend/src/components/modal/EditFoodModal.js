import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../constants/modal';

const EditFoodModal = ({
    show,
    handleConfirmModal,
    handleCloseModal,
    food,
    categories,
    isAddFood = false,
}) => {
    const [name, setName] = useState(isAddFood ? '' : food && food.name);
    const [description, setDescription] = useState(
        isAddFood ? '' : food && food.description
    );
    const [chef, setChef] = useState(isAddFood ? '' : food && food.chef);
    const [imageLink, setImageLink] = useState(
        isAddFood ? '' : food && food.imageLink
    );
    const [categoryId, setCategoryId] = useState(
        (food && food.categoryId && food.categoryId._id) || ''
    );

    useEffect(() => {
        setName(isAddFood ? '' : food && food.name);
        setChef(isAddFood ? '' : food && food.chef);
        setDescription(isAddFood ? '' : food && food.description);
        setImageLink(isAddFood ? '' : food && food.imageLink);
        setCategoryId((food && food.categoryId && food.categoryId._id) || '');
    }, [food]);

    const handleCancelButton = (e) => {
        e.preventDefault();
        handleCloseModal();
    };

    const handleConfirmButton = (e) => {
        e.preventDefault();
        handleConfirmModal(name, categoryId, description, chef, imageLink);
    };

    const handleChangeCategory = (e) => {
        setCategoryId(e.target.value);
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel={'Edit Food Modal'}
        >
            <h2 className="mb-4">
                {isAddFood ? 'Thêm món ăn' : 'Cập nhật tên món'}
            </h2>
            <form>
                <div>
                    <label htmlFor="name">Tên món</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control mb-3"
                        placeholder="Tên món..."
                        value={name || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="categoryId">Danh mục</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={categoryId}
                        onChange={(e) => handleChangeCategory(e)}
                    >
                        {categories &&
                            categories.length > 0 &&
                            categories.map((cate) => (
                                <option
                                    key={cate._id}
                                    value={cate._id}
                                >
                                    {cate.name}
                                </option>
                            ))}
                    </select>
                    <label htmlFor="chef">Đầu bếp</label>
                    <input
                        id="chef"
                        name="chef"
                        className="form-control mb-3"
                        placeholder="Đầu bếp..."
                        value={chef || ''}
                        onChange={(e) => setChef(e.target.value)}
                    />
                    <label htmlFor="description">Mô tả</label>
                    <input
                        id="description"
                        name="description"
                        className="form-control mb-3"
                        placeholder="Mô tả..."
                        value={description || ''}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor="img">Link ảnh</label>
                    <input
                        id="img"
                        name="img"
                        className="form-control mb-3"
                        placeholder="Link ảnh..."
                        value={imageLink || ''}
                        onChange={(e) => setImageLink(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-secondary btn-round mt-4 mr-4"
                        onClick={(e) => handleCancelButton(e)}
                    >
                        Hủy
                    </button>
                    <button
                        className="btn btn-success btn-round mt-4"
                        onClick={(e) => handleConfirmButton(e)}
                    >
                        {isAddFood ? 'Thêm món' : 'Cập nhật'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditFoodModal;
