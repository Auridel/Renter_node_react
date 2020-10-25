import React, {useContext, useEffect} from "react";
import Navbar from "../navbar/navbar";
import Routes from "../Routes/routes";
import Header from "../header/header";
import AuthContext from "../../context/authContext";
import DataContext from "../../context/dataContext";
import {ToastContainer, toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "../../index.scss";



const App = () => {
    const {isAuth, service, token, logout} = useContext(AuthContext);
    const {loadReady, updateData, loadStatus} = useContext(DataContext)

    const showToast = (msg) => {
        toast.dark(`${msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
            if((isAuth && !!token && loadStatus === false)){
                service.getEntries(JSON.stringify(token))
                    .then(res => {
                        updateData(res);
                        loadReady(true);
                    })
                    .catch(e => {
                        showToast(e.desc);
                        loadReady(false);
                        if(e.status === 403) {
                            logout();
                            loadReady(false);
                            updateData(null);
                        }
                    })
            }
        }, [isAuth, token, loadStatus])

    return (
        <div className="wrapper">
            <Navbar/>
            <main className="main-content">
                {isAuth? <Header/> : ""}
                <div className="main-content__wrapper">
                    <Routes/>
                </div>
            </main>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
};

export default App;