import React, {useContext, useState} from "react";
import AuthContext from "../../context/authContext";
import {checkEmail, checkPass} from "../../utils/validators";
import Spinner from "../spinner/spinner";

import "./authForm.scss";

const AuthForm = () => {
    const [show, setShow] = useState("login");
    const [waiting, setWaiting] = useState(false);
    const {login, service} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({});
    const [registerForm, setRegisterForm] = useState({});
    const loginHandler = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
    }
    const registerHandler = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    }
    const onFormSubmit = (e, action, data) => {
        e.preventDefault();
        switch (action) {
            case "login": {
                if(checkEmail(data.email) && checkPass(data.password)){
                    setWaiting(true);
                    service.login(JSON.stringify(data))
                        .then(res => {
                            setWaiting(false);
                            login(res);
                        })
                        .catch(e => {
                            setWaiting(false);
                        })
                }
                break;
            }
            case "register": {
                if(checkEmail(data.email) && checkPass(data.password) && (data.password === data.confirm) && data.name.trim().length > 2){
                    setWaiting(true);
                    service.register(JSON.stringify(data))
                        .then(res => {
                            setWaiting(false);
                            setShow("login");
                        })
                        .catch(e => {
                            setWaiting(false);
                            console.log(e)
                        })
                }
                break;
            }
            default: return null;
        }
    }
    const showSpinner = () => {
        if(waiting) return <Spinner/>
    }


    return (
        <section className="login">
            {show === "login" ?
                <form key="login" action="" method="post">
                    {showSpinner()}
                    <div className="login__input-container">
                        <label htmlFor="email" className="login__label">Email Address</label>
                        <input
                            onChange={loginHandler}
                            id="email"
                            className="login__input" type="email" name="email"/>
                    </div>
                    <div className="login__input-container">
                        <label htmlFor="password" className="login__label">Password</label>
                        <input
                            onChange={loginHandler}
                            id="password"
                            className="login__input" type="password" name="password"/>
                    </div>
                    <button
                        onClick={(e) => {
                            onFormSubmit(e, "login", loginForm);
                        }}
                        className="login__submit"
                        type="submit">Войти</button>
                    <button
                        onClick={() => setShow("register")}
                        className="login__tab-btn"
                        type="button">Зарегистрироваться</button>
                </form>
                :
            <form key="register" action="" method="post">
                {showSpinner()}
                <div className="login__input-container">
                    <label htmlFor="name" className="login__label">Ваше имя</label>
                    <input
                        onChange={registerHandler}
                        id="name"
                        className="login__input" type="text" name="name"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="email" className="login__label">Email Адрес</label>
                    <input
                        onChange={registerHandler}
                        id="email"
                        className="login__input" type="email" name="email"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="password" className="login__label">Пароль</label>
                    <input
                        onChange={registerHandler}
                        id="password"
                        className="login__input" type="password" name="password"/>
                </div>
                <div className="login__input-container">
                    <label htmlFor="password" className="login__label">Повторите пароль</label>
                    <input
                        onChange={registerHandler}
                        id="password"
                        className="login__input" type="password" name="confirm"/>
                </div>
                <button
                    onClick={(e) => onFormSubmit(e, "register", registerForm)}
                    className="login__submit"
                    type="submit">Зарегистрироваться</button>
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