import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../context/dataContext";
import Spinner from "../spinner/spinner";
import ChangePlan from "../changeField/changeField";
import MetersForm from "../metersForm/metersForm";
import {keysArr, fieldsArr} from "../../utils/fields";


import "./plan.scss";

const Plan = () => {
    const [plan, setPlan] = useState({});
    const [meters, setMeters] = useState({});
    const [defValue, setDefValue] = useState({});
    const [editable, setEditable] = useState(null);
    const [addFormVisible, setAddFormVisible] = useState(false);
    const {loadStatus, data} = useContext(DataContext);

    const updateMeters = () => {

    }

    useEffect(() => {
        if(!!data){
            if(!!data.entries.length) {
                setPlan(data.entries[data.entries.length - 1].cur_plan);
                setMeters(data.entries[data.entries.length - 1].meters);
                setDefValue(data.entries[data.entries.length - 1].meters);
            }
            else {
                setPlan({cold_plan: 0, hot_plan: 0, day_plan: 0, night_plan: 0});
                setMeters({cold: 0, hot: 0, day: 0, night: 0});
                setDefValue({cold: 0, hot: 0, day: 0, night: 0});
            }
        }
    }, [data])






    return (
    <>
        <section className="plan__block">
            <div className="plan__current">
                <h2 className="block__header">Ваш тариф на текущий месяц</h2>
                <div className="plan__wrapper">
                    {keysArr.map((item, i) => {
                        return (
                            <div key={`${item}_plan`} className="plan__values">
                                <span className="plan__values-header">{fieldsArr[i]}</span>
                                {editable === `${item}_plan` ? <ChangePlan item={`${item}_plan`} value={plan} setter={setPlan} trigger={setEditable}/>
                                    :
                                <span
                                    onClick={() => setEditable(`${item}_plan`)}
                                    className="plan__values-value">
                                {loadStatus ? plan[`${item}_plan`] : <Spinner/>}
                                </span>
                            }
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="plan__info">
                <h3 className="info__header">Информация</h3>
                <article className="info__block">
                    Уважаемый пользователь!
                    Это приложение предназначено для автоматического расчета месячных платежей по счетчикам воды и электричества, а также хранения этих данных. Для изменения вашего текущего тарифа щелкните на соответствующее поле и введите новое значение. Внимание! Плата за водоотведение расчитывается по тарифу холодного водоснабжения.
                </article>
            </div>
        </section>
        <button
            onClick={() => {
                if(loadStatus && !!data){
                    setAddFormVisible(true)
                }
            }}
            className="add-btn">Добавить показания</button>
        {addFormVisible? <MetersForm
            defValue={defValue}
            meters={meters}
            setMeters={setMeters}
            close={setAddFormVisible}/> : ""}
    </>
    )
};

export default Plan;