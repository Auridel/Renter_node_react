import React, {useRef} from "react";
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import AuthForm from "../authForm/authForm";

import "./login.scss";

const Login = () => {
    const parallaxRef = useRef();

    return (
        <div className="parallax__wrapper">
            <Parallax  pages={1.8} scrolling={true} vertical ref={parallaxRef}>
                <ParallaxLayer
                    offset={0} speed={0.5} factor={1}
                    className="parallax__main">
                    <h1 className="parallax__header">Добро Пожаловать!</h1>
                    <p className="parallax__desc">Рады приветствовать вас в приложении "Рентье". Мы поможем расчитать вам коммунальные платежи по счетчикам всего в несколько кликов. Поскольку приложение работает с базой данных, просим вас зарегистрироваться, это займет всего несколько секунд.</p>
                    <button
                        onClick={() => parallaxRef.current.scrollTo(1.4)}
                        className="parallax__login">Войти или зарегистрироваться</button>
                </ParallaxLayer>
                <ParallaxLayer style={{backgroundSize: "cover", height: "600px"}} className="parallax__bg" offset={0.5} speed={0.1}/>
                <ParallaxLayer offset={1} speed={0.3}>
                    <AuthForm/>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
};

export default Login