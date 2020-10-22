import React, {useState, useRef, useEffect} from "react";

import "./userPage.scss";

const UserPage = () => {
    const [editable, setEditable] = useState(false);
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
                    <span className="user__info-field">User Name</span>
                        :
                    <input className="user__input" ref={nameRef} type="text" name="name" defaultValue="User Name"/>}
                </div>
                <div className="user__info">
                    <span className="user__info-label">Email: </span>
                    {!editable?
                    <span className="user__info-field">123@mail.ru</span>
                        :
                    <input className="user__input" ref={emailRef} type="email" name="email" defaultValue="123@mail.ru"/>}
                </div>
                <button
                    onClick={() => {
                        setEditable(!editable);
                    }}
                    className="user__change-btn">Изменить</button>
            </section>
        </>
    )
};

export default UserPage;