import React, {useContext, useEffect} from "react";
import Navbar from "../navbar/navbar";
import Routes from "../Routes/routes";
import Header from "../header/header";
import AuthContext from "../../context/authContext";
import DataContext from "../../context/dataContext";

import "../../index.scss";



const App = () => {
    const {isAuth, service, token, logout} = useContext(AuthContext);
    const {loadReady, updateData} = useContext(DataContext)
    useEffect(() => {
            if((isAuth && !!token)){
                service.getEntries(JSON.stringify(token))
                    .then(res => {
                        console.log(res);
                        updateData(res);
                        loadReady(true);
                    })
                    .catch(e => {
                        loadReady(false);
                        if(e.status === 403) logout();
                    })
            }
        }, [isAuth, token])
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