// import './assets/styles/App.css';
import './assets/styles/bootstrap.css';
import './assets/styles/font-awesome.min.css';
import './assets/styles/responsive.css';
import './assets/styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AdminFood from './pages/admin/AdminFood';

import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import LoginModal from './components/modal/LoginModal';
import { useEffect } from 'react';
import { clearToast } from './slices/toastSlice';
import AdminOrder from './pages/admin/AdminOrder';

function App() {
    const dispatch = useDispatch();
    const toastData = useSelector((state) => state.toast);

    useEffect(() => {
        if (toastData) {
            const { message, type } = toastData;
            toast[type](message, { autoClose: 2000 });
            dispatch(clearToast);
        }
    }, [toastData, dispatch]);

    return (
        <div className="App">
            <div className="sub_page">
                <ToastContainer />
                <LoginModal />
                <Header />
                <main>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            exact
                            path="/favorites"
                            element={<Favorite />}
                        />
                        <Route
                            exact
                            path="/carts"
                            element={<Cart />}
                        />
                        <Route
                            exact
                            path="/orders"
                            element={<Order />}
                        />
                        {/* admin */}
                        <Route
                            exact
                            path="/admin"
                            element={<AdminFood />}
                        />
                        <Route
                            exact
                            path="/admin/orders"
                            element={<AdminOrder />}
                        />
                        <Route
                            path="*"
                            element={<NotFound />}
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
