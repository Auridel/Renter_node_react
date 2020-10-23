import React, {useContext} from "react";
import DataContext from "../../context/dataContext";
import {Link} from "react-router-dom";
import Spinner from "../spinner/spinner";

import "./header.scss";

const Header = () => {
    const {loadStatus, data} = useContext(DataContext);

    return (
        <header className="main-content__header">
            <h1 className="main-title">Добро пожаловать!</h1>
            <div className="user-info">
                <Link to="/user" className="user-name">{loadStatus ? data.userName : <Spinner/>}</Link>
            </div>
        </header>
    )
};

export default Header;