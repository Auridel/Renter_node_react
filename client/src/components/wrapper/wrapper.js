import React from "react";
import AuthContext from "../../context/authContext";
import DataContext from "../../context/dataContext";
import App from "../app/app";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "../../hook/authHook";
import {useData} from "../../hook/dataHook";
import WebService from "../../webService/webService";

const service = new WebService();

const Wrapper = () => {
    const {login, logout, token, loaded} = useAuth();
    const {loadStatus, loadReady, data, updateData, errors, updateErrors, clearErrors} = useData();
    const isAuth = !!token;
    return (
        <Router>
            <AuthContext.Provider value={{isAuth, token, service, login, logout, loaded}}>
                <DataContext.Provider value={{loadStatus, loadReady, data, updateData, errors, updateErrors, clearErrors}}>
                    <App/>
                </DataContext.Provider>
            </AuthContext.Provider>
        </Router>
    )
};

export default Wrapper;