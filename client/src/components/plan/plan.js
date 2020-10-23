import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../context/dataContext";
import Spinner from "../spinner/spinner";

import "./plan.scss";

const Plan = () => {
    const [plan, setPlan] = useState({});
    const [editable, setEditable] = useState(null);
    const {loadStatus, data} = useContext(DataContext);

    useEffect(() => {
        if(!!data){
            setPlan(data.entries[data.entries.length - 1].cur_plan);
        }
    }, [data])

    const showPlan = (key) => {
        if (!data.entries.length) {
            return 0;
        }
        else {
            return plan[key];
        }
    }
    const changePlan = (key) => {
        return (
            <div className="plan__change">
                <input
                    onInput={(e) => {
                        e.target.value = e.target.value.trim().replace(/[^.\d]/g, "");
                        setPlan({...plan, [key]: e.target.value});
                    }}
                    onBlur={() => {setEditable(null)}}
                    onKeyPress={(e) => {
                        if(e.key === "Enter" || e.key === "Escape") setEditable(null);
                    }}
                    autoFocus
                    defaultValue={plan[key]}
                    className="plan__input"
                    type="text" />
            </div>
        )
    }

    return (
        <section className="plan__block">
            <div className="plan__current">
                <h2 className="block__header">Ваш тариф на текущий месяц</h2>
                <div className="plan__wrapper">
                    <div className="plan__values">
                        <span className="plan__values-header">Холодное водоснабжение</span>
                        {editable === "cold_plan" ? changePlan("cold_plan")
                            :
                            <span
                                onClick={() => setEditable("cold_plan")}
                                className="plan__values-value">
                            {loadStatus ? showPlan("cold_plan") : <Spinner/>}
                            </span>
                        }
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Горячее водоснабжение</span>
                        {editable === "hot_plan" ? changePlan("hot_plan")
                            :
                            <span
                                onClick={() => setEditable("hot_plan")}
                                className="plan__values-value">
                                {loadStatus ? showPlan("hot_plan") : <Spinner/>}
                            </span>
                        }
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Электричество день</span>
                        {editable === "day_plan" ? changePlan("day_plan")
                            :
                            <span
                                onClick={() => setEditable("day_plan")}
                                className="plan__values-value">
                                {loadStatus ? showPlan("day_plan") : <Spinner/>}
                            </span>
                        }
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Электричество ночь</span>
                        {editable === "night_plan" ? changePlan("night_plan")
                            :
                            <span
                                onClick={() => setEditable("night_plan")}
                                className="plan__values-value">
                                {loadStatus ? showPlan("night_plan") : <Spinner/>}
                            </span>
                        }
                    </div>
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
    )
};

export default Plan;