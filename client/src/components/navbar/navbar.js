import React from "react";
import "./navbar.scss";

const Navbar = () => {
    return (
            <nav className="main-nav">
                <ul className="main-nav__list">
                    <li className="main-nav__item active">
                        <button className="main-nav__btn wallet">Платежи</button>
                    </li>
                    <li className="main-nav__item">
                        <button className="main-nav__btn settings">Личный кабинет</button>
                    </li>
                    <li className="main-nav__item">
                        <button className="main-nav__btn logout">Выход</button>
                    </li>
                </ul>
            </nav>
    )
};

export default Navbar;