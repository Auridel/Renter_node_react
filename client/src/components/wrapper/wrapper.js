import React from "react";
import AuthContext from "../../context/authContext";
import App from "../app/app";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "../../hook/authHook";
import WebService from "../../webService/webService";

const service = new WebService();

const Wrapper = () => {
    const {login, logout, token, loaded} = useAuth();
    const isAuth = !!token;
    return (
        <Router>
            <AuthContext.Provider value={{isAuth, token, service, login, logout, loaded, dataLoaded: false, entries: null}}>
                <App/>
            </AuthContext.Provider>
        </Router>
    )
};

export default Wrapper;