import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <div className="app-wrapper-footer">
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a
                                        href="http://rumahsakit.untan.ac.id/"
                                        className="nav-link"
                                    >
                                        Rumah Sakit Universitas Tanjungpura
                                        Pontianak
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Copyright &copy; 2020
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="app-footer-right">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        IT RS UNTAN
                                    </a>
                                </li>
                                <li className="nav-item nav-link">
                                    <div className="badge badge-warning mr-1 ml-0">
                                        <small>IT</small>
                                    </div>
                                    <a
                                        href="http://masariuman.xyz"
                                        target="blank"
                                    >
                                        Arif Setiawan
                                    </a>
                                    &nbsp; | M. Arief Maulana&nbsp;
                                    <div className="badge badge-warning mr-1 ml-0">
                                        <small>TI</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
