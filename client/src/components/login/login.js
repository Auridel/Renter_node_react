import React from "react";
import AuthForm from "../authForm/authForm";

import "./login.scss";

const Login = () => {


    return (
        <div className="welcome__wrapper">
            <h1 className="welcome__header">Добро Пожаловать!</h1>
            <p className="welcome__desc">Рады приветствовать вас в приложении "Рентье". Мы поможем расчитать вам коммунальные платежи по счетчикам всего в несколько кликов. Поскольку приложение работает с базой данных, просим вас зарегистрироваться, это займет всего несколько секунд.</p>
            <AuthForm/>
        </div>
    )
};

export default Login