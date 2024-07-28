import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/loginModalSlice';
import { showToast } from '../../slices/toastSlice';

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

Modal.setAppElement('#root');

const LoginModal = () => {
    const dispatch = useDispatch();
    const loginModal = useSelector((state) => state.loginModal);

    const email = loginModal.isAdmin
        ? 'sosvanish@gmail.com'
        : 'camnhii1202@gmail.com';
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(
            showToast({
                message: `Login successfully ${password} ${email}`,
                type: 'success',
            })
        );
        dispatch(closeModal());
    };

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onRequestClose={() => dispatch(closeModal())}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentLabel="Login Modal"
        >
            <h2 className="mb-4">Phải Bé Iu hông đó?</h2>
            <h2 className="mb-4">Đăng nhập nào</h2>
            <form>
                <div>
                    <input
                        className="form-control my-3"
                        placeholder="Mật khẩu nè..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-root btn-block btn-round mt-4"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </button>
            </form>
        </Modal>
    );
};

export default LoginModal;
