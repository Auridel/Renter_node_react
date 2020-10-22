import React from "react";

import "./entries.scss"

const Entries = () => {
    return (
        <section className="entries__wrapper">
            <h2 className="entries__header">История операций</h2>
            <div className="entries__content">
                <div className="entries__nav">
                    <span>Jan 2020 - Aug 2020</span>
                    <div className="entries__nav-controls">
                        <input id="6m" hidden type="radio" value="6month" name="data_range" checked/>
                        <label htmlFor="6m" className="entries__nav-label">
                            6 месяцев
                        </label>
                        <input id="12m" hidden type="radio" value="12month" name="data_range"/>
                        <label htmlFor="12m" className="entries__nav-label">
                            12 месяцев
                        </label>
                    </div>
                </div>
                <ul className="entries__list">
                    <li className="entries__list-item">
                        <button className="expand-btn"/>
                        <span className="entries__list-data">January 2020</span>
                        <span className="entries__list-data">HV: +3</span>
                        <span className="entries__list-data">GV: +5</span>
                        <span className="entries__list-data">DAY: +343</span>
                        <span className="entries__list-data">NIGHT: +113</span>
                        <span className="entries__list-data">PRICE: 1200</span>
                    </li>
                    <li className="entries__list-item">
                        <button className="expand-btn"/>
                        <span className="entries__list-data">January 2020</span>
                        <span className="entries__list-data">HV: +3</span>
                        <span className="entries__list-data">GV: +5</span>
                        <span className="entries__list-data">DAY: +343</span>
                        <span className="entries__list-data">NIGHT: +113</span>
                        <span className="entries__list-data">PRICE: 1200</span>
                    </li>
                    <li className="entries__list-item">
                        <button className="expand-btn"/>
                        <span className="entries__list-data">January 2020</span>
                        <span className="entries__list-data">HV: +3</span>
                        <span className="entries__list-data">GV: +5</span>
                        <span className="entries__list-data">DAY: +343</span>
                        <span className="entries__list-data">NIGHT: +113</span>
                        <span className="entries__list-data">PRICE: 1200</span>
                    </li>
                    <li className="entries__list-item">
                        <button className="expand-btn"/>
                        <span className="entries__list-data">January 2020</span>
                        <span className="entries__list-data">HV: +3</span>
                        <span className="entries__list-data">GV: +5</span>
                        <span className="entries__list-data">DAY: +343</span>
                        <span className="entries__list-data">NIGHT: +113</span>
                        <span className="entries__list-data">PRICE: 1200</span>
                    </li>
                </ul>
            </div>
        </section>
    )
};

export default Entries;