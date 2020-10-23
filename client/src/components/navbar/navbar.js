import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/authContext";

import "./navbar.scss";

const Navbar = () => {
    const {isAuth, logout} = useContext(AuthContext);

    return (
            <nav className="main-nav">
                <ul className="main-nav__list">
                    {isAuth?
                    <>
                        <Link to="/account">
                            <li className="main-nav__item active">
                                <button className="main-nav__btn wallet">Платежи</button>
                            </li>
                        </Link>
                        <Link to="/user">
                            <li className="main-nav__item">
                                <button className="main-nav__btn settings">Личный кабинет</button>
                            </li>
                        </Link>
                        <li className="main-nav__item">
                            <button
                                onClick={() => logout()}
                                className="main-nav__btn logout">Выход</button>
                        </li>
                    </>
                        :
                    <Link to="/login">
                        <li className="main-nav__item">
                            <button className="main-nav__btn login">Войти</button>
                        </li>
                    </Link>}
                </ul>
            </nav>
    )
};

export default Navbar;