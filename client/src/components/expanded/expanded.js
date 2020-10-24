import React, {useContext, useEffect} from "react";
import DataContext from "../../context/dataContext";
import {keysArr, fieldsArr} from "../../utils/fields"
import AuthContext from "../../context/authContext";

import "./expanded.scss";

const Expanded = ({id, trigger}) => {
    const {data, loadReady, updateData} = useContext(DataContext);
    const {service, token, logout} = useContext(AuthContext);
    const current = data.entries.filter(el => el.timestamp === id)[0];
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        }
    })

    const detete = (id) => {
        service.deleteData(JSON.stringify({timestamp: id}), JSON.stringify(token))
            .then(() => {
                trigger(null);
                loadReady(false);
            })
            .catch(e => {
                if(e.status === 403) {
                    loadReady(false);
                    updateData(null);
                    logout();
                }
            })
    }

    return (
        <div
            onClick={(e) => {
                if(e.target.classList.contains("overlay")) trigger(false)
            }}
            className="overlay">
        <div className="expanded">
            <h3>Тариф</h3>
            {keysArr.map((item, i) => {
                return (
                    <div key={`${item}_plan`} className="expanded__block">
                        <span className="expanded__label">{fieldsArr[i]}: </span>
                        <span className="expanded__value">{current.cur_plan[`${item}_plan`]}</span>
                    </div>
                )
            })}
            <h3>Показания</h3>
            {keysArr.map((item, i) => {
                return (
                    <div key={`${item}`} className="expanded__block">
                        <span className="expanded__label">{fieldsArr[i]}: </span>
                        <span className="expanded__value">{current.meters[item]}</span>
                    </div>
                )
            })}
            <span className="expanded__date">
                {new Intl.DateTimeFormat({
                    day: "2-digit", month: "long", year: "numeric"
                }).format(new Date(current.date))}
            </span>
            <strong className="expanded__price">Итого: {current.price} руб.</strong>
            <div>
                <button
                    onClick={() => detete(id)}
                    className="expanded__del-btn">Удалить запись</button>
                <button
                    onClick={() => trigger(false)}
                    className="expanded__close-btn">Закрыть</button>
            </div>
        </div>
        </div>
    )
};

export default Expanded;