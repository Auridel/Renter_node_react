import React, {useState} from "react";
import ChangePlan from "../changeField/changeField";
import {keysArr, fieldsArr} from "../../utils/fields";
import {useTransition, animated} from 'react-spring';

import "./metersForm.scss"

const MetersForm = ({meters, setMeters, close, defValue, update}) => {
    const [editable, setEditable] = useState(null);
    const [error, setError] = useState({});
    const errorHandler = (key, value) => {
        if(+defValue[key] > +value){
            setError({...error, [key]:true});
            setMeters({...meters, [key]: defValue[key]});
        }
        else setMeters({...meters, [key]: value});
    }

    const [toggle, set] = useState(false)
    const transitions = useTransition(toggle, null, {
        from: { opacity: 0, height: 0, innerHeight: 0 },
        enter: { opacity: 1, height: "auto", innerHeight: "auto" },
        leave: [{delay: 200},  {innerHeight: 0}, { opacity: 0, height: 0 }]
    })

    return (
        transitions.map(({ item, props, key }) => { return <animated.div key={key} style={props}>

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
            <button
                onClick={update}
                className="meters__add-btn">Отправить показания</button>
            <button
                onClick={() => {
                    setMeters(defValue);
                    close(false);
                }}
                className="meters__cancel-btn">Отмена</button>
        </section></animated.div>})

    )
};

export default MetersForm;