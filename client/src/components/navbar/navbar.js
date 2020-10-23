import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";
import AuthContext from "../../context/authContext";
import DataContext from "../../context/dataContext";

import "./navbar.scss";

const Navbar = () => {
    const {isAuth, logout} = useContext(AuthContext);
    const {updateData, loadReady} = useContext(DataContext);
    const location = useLocation();

    return (
            <nav className="main-nav">
                <ul className="main-nav__list">
                    {isAuth?
                    <>
                        <Link to="/account">
                            <li className={classNames({
                                "main-nav__item": true,
                                "active": location.pathname === "/account"
                            })}>
                                <button className="main-nav__btn wallet">Платежи</button>
                            </li>
                        </Link>
                        <Link to="/user">
                            <li className={classNames({
                                "main-nav__item": true,
                                "active": location.pathname === "/user"
                            })}>
                                <button className="main-nav__btn settings">Личный кабинет</button>
                            </li>
                        </Link>
                        <li className="main-nav__item">
                            <button
                                onClick={() => {
                                    logout();
                                    loadReady(false);
                                    updateData(null);
                                }}
                                className="main-nav__btn logout">Выход</button>
                        </li>
                    </>
                        :
                    <Link to="/login">
                        <li className={classNames({
                            "main-nav__item": true,
                            "active": location.pathname === "/login"
                        })}>
                            <button className="main-nav__btn login">Войти</button>
                        </li>
                    </Link>}
                </ul>
            </nav>
    )
};

export default Navbar;