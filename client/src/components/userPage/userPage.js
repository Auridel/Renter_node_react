import React, {useState, useRef, useEffect, useContext} from "react";
import DataContext from "../../context/dataContext";
import AuthContext from "../../context/authContext";
import Spinner from "../spinner/spinner";
import {toast} from "react-toastify";

import "./userPage.scss";

const UserPage = () => {
    const [editable, setEditable] = useState(false);
    const {loadStatus, data, updateData, loadReady} = useContext(DataContext);
    const {token, service, logout} = useContext(AuthContext);
    const nameRef = useRef();

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
        if(editable) nameRef.current.focus();
    }, [editable])

    const updateName = (value) => {
        if(value !== data.userName && value.trim().length > 2){
            setEditable(false);
            service.updateName(JSON.stringify({name: value}), JSON.stringify(token))
                .then(() => {
                    loadReady(false);
                    updateData(null);

                })
                .catch(e => {
                    showToast(e.desc);
                    if(e.status === 403) {
                        loadReady(false);
                        updateData(null);
                        logout();
                    }
                })
        }
    }

    return (
        <>
            <section className="user__page">
                <h2 className="user__header">Контактная информация</h2>
                <div className="user__info">
                    <span className="user__info-label">Имя: </span>
                    {!editable?
                    <span className="user__info-field">{loadStatus? data.userName : <Spinner/>}</span>
                        :
                    <input
                        onKeyPress={e => {
                            if(e.key === "Enter") updateName(nameRef.current.value);
                        }}
                        className="user__input"
                        ref={nameRef} type="text"
                        name="name" defaultValue={data.userName}/>}
                </div>
                <div className="user__info">
                    <span className="user__info-label">Email: </span>
                    <span className="user__info-field">{loadStatus? data.email : <Spinner/>}</span>
                </div>
                <button
                    onClick={() => {
                        if(editable) updateName(nameRef.current.value);
                        if(loadStatus) setEditable(!editable);
                    }}
                    className="user__change-btn">Изменить</button>
            </section>
        </>
    )
};

export default UserPage;