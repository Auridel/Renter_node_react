import React, {useState} from "react";

import "./authForm.scss";

const AuthForm = () => {
    const [show, setShow] = useState("login");

    return (
        <section className="login">
            {show === "login" ?
                <form action="" method="post">
                    <div className="login__input-container">
                        <label htmlFor="email" className="login__label">Email Address</label>
                        <input id="email" className="login__input" type="email" name="email"/>
                    </div>
                    <div className="login__input-container">
                        <label htmlFor="password" className="login__label">Password</label>
                        <input id="password" className="login__input" type="password" name="password"/>
                    </div>
                    <button className="login__submit" type="submit">Войти</button>
                    <button
                        onClick={() => setShow("register")}
                        className="login__tab-btn"
                        type="button">Зарегистрироваться</button>
                </form>
                :
            <form action="" method="post">
                <div className="login__input-container">
                    <label htmlFor="name" className="login__label">Ваше имя</label>
                    <input id="name" className="login__input" type="email" name="name"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="email" className="login__label">Email Адрес</label>
                    <input id="email" className="login__input" type="email" name="email"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="password" className="login__label">Пароль</label>
                    <input id="password" className="login__input" type="password" name="password"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="password" className="login__label">Повторите пароль</label>
                    <input id="password" className="login__input" type="password" name="confirm"/>
                </div>
                <button className="login__submit" type="submit">Зарегистрироваться</button>
                <button
                    onClick={() => setShow("login")}
                    className="login__tab-btn"
                    type="button">На страницу входа</button>
            </form>
            }
        </section>
    )
};

export default AuthForm;