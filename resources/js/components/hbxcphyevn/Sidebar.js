import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            activeIndex: 0
        };
    }

    toggleClass(index, e) {
        this.setState({ activeIndex: index });
    }

    render() {
        return (
            <div className="app-sidebar sidebar-shadow bg-happy-green sidebar-text-light">
                <div className="app-header__logo">
                    <div className="logo-src"></div>
                    <div className="header__pane ml-auto">
                        <div>
                            <button
                                type="button"
                                className="hamburger close-sidebar-btn hamburger--elastic"
                                data-classname="closed-sidebar"
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
                <div className="scrollbar-sidebar">
                    <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                            <li className="app-sidebar__heading"><center>Aplikasi</center> <center>Cetak Label, Gelang, Tracer</center><center>Dan Data Pasien Hari Ini</center><center>Rumah Sakit</center> <center>Universitas Tanjungpura</center> </li>
                            <li>
                            <NavLink exact to={`/`} activeClassName="mm-active" className="{this.state.activeIndex==0 ? 'mm-active': null}" onClick={this.toggleClass.bind(this, 0)}>                                
                                    <i className="metismenu-icon pe-7s-print"></i>
                                    Label & Gelang                               
                              </NavLink>
                            </li>
                            <li >
                              <NavLink exact to={`/tracer`} activeClassName="mm-active"  className="{this.state.activeIndex==0 ? 'mm-active': null}"  onClick={this.toggleClass.bind(this, 1)}>
                                    <i className="metismenu-icon pe-7s-ticket"></i>
                                    Tracer
                              </NavLink>
                            </li>
                            <li>
                            <NavLink exact to={`/today_pasien`} activeClassName="mm-active" className="{this.state.activeIndex==0 ? 'mm-active': null}"  onClick={this.toggleClass.bind(this, 1)}>
                                    <i className="metismenu-icon pe-7s-note2"></i>
                                    Pasien Hari Ini
                            </NavLink>
                            </li> 
                        </ul>                           
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
