import React from "react";
import AuthForm from "../authForm/authForm";

import "./login.scss";

const Login = () => {


    return (
        <div className="parallax__wrapper">
            <h1 className="parallax__header">Добро Пожаловать!</h1>
            <p className="parallax__desc">Рады приветствовать вас в приложении "Рентье". Мы поможем расчитать вам коммунальные платежи по счетчикам всего в несколько кликов. Поскольку приложение работает с базой данных, просим вас зарегистрироваться, это займет всего несколько секунд.</p>
            <button
                className="parallax__login">Войти или зарегистрироваться</button>

            <AuthForm/>
        </div>
    )
};

export default Login