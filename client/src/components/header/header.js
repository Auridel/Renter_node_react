import React from "react";

import "./header.scss";

const Header = () => {
    return (
        <header className="main-content__header">
            <h1 className="main-title">Добро пожаловать!</h1>
            <div className="user-info">
                <a href="" alt="your account" className="user-name">User Name</a>
            </div>
        </header>
    )
};

export default Header;