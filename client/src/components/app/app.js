import React, {useContext} from "react";
import Navbar from "../navbar/navbar";
import Routes from "../Routes/routes";
import Header from "../header/header";
import AuthContext from "../../context/authContext";

import "../../index.scss";



const App = () => {
    const {isAuth} = useContext(AuthContext);
    return (
        <div className="wrapper">
            <Navbar/>
            <main className="main-content">
                {isAuth? <Header/> : ""}
                <div className="main-content__wrapper">
                    <Routes/>
                </div>
            </main>
        </div>
    )
};

export default App;