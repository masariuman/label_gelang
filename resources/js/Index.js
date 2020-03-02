import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Setting from "./components/hbxcphyevn/Setting";
import Header from "./components/hbxcphyevn/Header";
import Sidebar from "./components/hbxcphyevn/Sidebar";
import Footer from "./components/hbxcphyevn/Footer";
import Index from "./components/Index";
import Track from "./components/Track";
// import Tracer from ".components/Track";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <Header />
            <Setting />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            <Route exact path="/tracer" component={Track} />
                            <Index />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>,

        document.getElementById("root")
    );
}
