// import './assets/styles/App.css';
import './assets/styles/bootstrap.css';
import './assets/styles/font-awesome.min.css';
import './assets/styles/responsive.css';
import './assets/styles/style.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import Cart from './pages/Cart';

function App() {
    return (
        <div className="App">
            <div className="sub_page">
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
