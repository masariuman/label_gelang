import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="app-header header-shadow bg-happy-green header-text-light">
                <div className="app-header__logo">
                    <div className="loogoo">RSUNTAN</div>
                    <div className="header__pane ml-auto">
                        <div>
                            <button
                                type="button"
                                className="hamburger close-sidebar-btn hamburger--elastic"
                                data-class="closed-sidebar"
                            >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="app-header__mobile-menu">
                    <div>
                        <button
                            type="button"
                            className="hamburger hamburger--elastic mobile-toggle-nav"
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="app-header__menu">
                    <span>
                        <button
                            type="button"
                            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                        >
                            <span className="btn-icon-wrapper">
                                <i className="fa fa-ellipsis-v fa-w-6"></i>
                            </span>
                        </button>
                    </span>
                </div>
                <div className="app-header__content">
                    <div className="app-header-right">
                        <div className="header-btn-lg pr-0">
                            <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="btn-group">
                                            <a
                                                data-togel="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                className="p-0 btn"
                                            >
                                                <img
                                                    width="42"
                                                    className="rounded-circle"
                                                    src={`/hbxcphyevn/t/poto/nophoto_pohon.png`}
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    {/* <div className="widget-content-left  ml-3 header-user-info">
                                        <div className="widget-heading">
                                            <Link to={`/`}>LABEL | GELANG</Link>
                                        </div>
                                        <div className="widget-subheading"></div>{" "}
                                        <div className="widget-heading">
                                            <Link to={`/tracer`}>TRACER</Link>
                                            <br />
                                            <Link to={`/today_pasien`}>
                                                DATA PASIEN HARI INI
                                            </Link>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
