import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 footer-col">
                        <div className="footer_detail">
                            <Link
                                to=""
                                className="footer-logo"
                            >
                                Bếp Iu
                            </Link>
                            <p>
                                Bếp Iu luôn sẵn sàng phục vụ cho Bé Iu <br />
                                Bếp Yêu - Bếp cho Bé Iuuu
                            </p>
                            <div className="footer_social">
                                <Link to="">
                                    <i
                                        className="fa fa-facebook"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                                <Link to="">
                                    <i
                                        className="fa fa-linkedin"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                                <Link to="">
                                    <i
                                        className="fa fa-instagram"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 footer-col">
                        <h4>Các buổi phục vụ</h4>
                        <p>Mỗi ngày</p>
                        <p>Buổi sáng, trưa, chiều, tối, ăn vặt</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
