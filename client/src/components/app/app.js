import React, {useContext, useEffect} from "react";
import Navbar from "../navbar/navbar";
import Routes from "../Routes/routes";
import Header from "../header/header";
import AuthContext from "../../context/authContext";

import "../../index.scss";



const App = () => {
    const {isAuth, service, token, dataLoaded} = useContext(AuthContext);
    useEffect(() => {
            if(isAuth && !!token){
                service.getEntries(JSON.stringify(token))
                    .then(res => console.log(res))
                    .catch(e => console.log(e))
            }
        }, [isAuth])
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