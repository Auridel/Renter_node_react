import React from "react";
import Navbar from "../navbar/navbar";
import Account from "../account/account";
import UserPage from "../userPage/userPage";

import "../../index.scss";

const App = () => {
    return (
        <div className="wrapper">
            <Navbar/>
            <main className="main-content">
                <header className="main-content__header">
                    <h1 className="main-title">Добро пожаловать!</h1>
                    <div className="user-info">
                        <a href="" alt="your account" className="user-name">User Name</a>
                    </div>
                </header>
                <div className="main-content__wrapper">
                    {/*<Account/>*/}
                    <UserPage/>
                </div>
            </main>
        </div>
    )
};

export default App;