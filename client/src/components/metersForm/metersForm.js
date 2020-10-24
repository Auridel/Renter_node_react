import React, {useState} from "react";
import ChangePlan from "../changeField/changeField";
import {keysArr, fieldsArr} from "../../utils/fields";

import "./metersForm.scss"

const MetersForm = ({meters, setMeters, close, defValue}) => {
    const [editable, setEditable] = useState(null);
    const [error, setError] = useState({});
    const errorHandler = (key, value) => {
        console.log(defValue)
        if(+defValue[key] > +value){
            setError({...error, [key]:true});
            setMeters({...meters, [key]: defValue[key]});
        }
        else setMeters({...meters, [key]: value});
    }

    return (
        <section className="meters__wrapper">
            <h3 className="meters__header">Укажите текущие показания</h3>
            <div className="meters__form">
                {keysArr.map((item, i) => {
                    return (
                        <div key={`${item}`} className="meters__values">
                            <span className="meters__values-header">{fieldsArr[i]}</span>
                            {editable === `${item}` ?
                                <ChangePlan
                                    item={`${item}`}
                                    value={meters}
                                    setter={setMeters}
                                    trigger={setEditable}
                                    errorHandler={errorHandler}
                                />
                                :
                                <span
                                    onClick={() => setEditable(`${item}`)}
                                    className="meters__values-value">
                                    {meters[`${item}`]}
                                    </span>
                            }
                        </div>
                    )
                })}
            </div>
            <button className="meters__add-btn">Отправить показания</button>
            <button
                onClick={() => close(false)}
                className="meters__cancel-btn">Отмена</button>
        </section>
    )
};

export default MetersForm;