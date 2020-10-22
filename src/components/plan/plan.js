import React from "react";
import "./plan.scss";

const Plan = () => {
    return (
        <section className="plan__block">
            <div className="plan__current">
                <h2 className="block__header">Ваш тариф на текущий месяц</h2>
                <div className="plan__wrapper">
                    <div className="plan__values">
                        <span className="plan__values-header">Холодное водоснабжение</span>
                        <span className="plan__values-value">31.51</span>
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Горячее водоснабжение</span>
                        <span className="plan__values-value">105.94</span>
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Электричество день</span>
                        <span className="plan__values-value">3.84</span>
                    </div>
                    <div className="plan__values">
                        <span className="plan__values-header">Электричество ночь</span>
                        <span className="plan__values-value">2.22</span>
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