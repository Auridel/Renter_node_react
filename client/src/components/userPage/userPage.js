import React, {useState, useRef, useEffect, useContext} from "react";
import DataContext from "../../context/dataContext";
import Spinner from "../spinner/spinner";

import "./userPage.scss";

const UserPage = () => {
    const [editable, setEditable] = useState(false);
    const {loadStatus, data} = useContext(DataContext);
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        if(editable) nameRef.current.focus();
    }, [editable])

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
                        className="user__input"
                        ref={nameRef} type="text"
                        name="name" defaultValue={data.userName}/>}
                </div>
                <div className="user__info">
                    <span className="user__info-label">Email: </span>
                    {!editable?
                    <span className="user__info-field">{loadStatus? data.email : <Spinner/>}</span>
                        :
                    <input
                        className="user__input"
                        ref={emailRef} type="email"
                        name="email" defaultValue={data.email}/>}
                </div>
                <button
                    onClick={() => {
                        if(loadStatus) setEditable(!editable);
                    }}
                    className="user__change-btn">Изменить</button>
            </section>
        </>
    )
};

export default UserPage;