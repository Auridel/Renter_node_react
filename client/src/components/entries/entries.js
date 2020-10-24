import React, {useContext, useState} from "react";
import DataContext from "../../context/dataContext";
import Spinner from "../spinner/spinner";

import "./entries.scss"

const Entries = () => {
    const {loadStatus, data} = useContext(DataContext);
    const sixMonth = 15552000000;
    const [sort, setSort] = useState(Date.now() - sixMonth);
    const changeSort = (opt) => {
        if(opt === "6m") setSort(Date.now() - sixMonth);
        else if(opt === "12m") setSort(Date.now() - (sixMonth * 2) )
    }


    const showEntries = (data) => {
        if(!data.entries.length) return(
            <h3>Записей еще нет</h3>
        );
        else {
            return (
                <><table className="entries__table">
                        <tr className="entries__list-item">
                            <th></th>
                            <th><span className="entries__list-data">Дата</span></th>
                            <th><span className="entries__list-data">ХВ</span></th>
                            <th><span className="entries__list-data">ГВ</span></th>
                            <th><span className="entries__list-data">День</span></th>
                            <th><span className="entries__list-data">Ночь</span></th>
                            <th><span className="entries__list-data">Итого</span></th>
                        </tr>

                {
                    data.entries.filter(item => Date.parse(item.date) > sort).map(el => {
                        return(
                            <tr key={Date.parse(el.date)} className="entries__list-item">
                                <td><button className="expand-btn"/></td>
                                <td><span className="entries__list-data">{new Intl.DateTimeFormat({
                                    day: "2-digit", month: "long", year: "numeric"
                                }).format(new Date(el.date))}</span></td>
                                <td><span className="entries__list-data">{el.meters.cold}</span></td>
                                <td><span className="entries__list-data">{el.meters.hot}</span></td>
                                <td><span className="entries__list-data">{el.meters.day}</span></td>
                                <td><span className="entries__list-data">{el.meters.night}</span></td>
                                <td><span className="entries__list-data">{el.price}</span></td>
                            </tr>
                        )})
                }
                </table></>
            )
        }
    }

    return (
        <section className="entries__wrapper">
            <h2 className="entries__header">История операций</h2>
            <div className="entries__content">
                <div className="entries__nav">
                    <span>Jan 2020 - Aug 2020</span>
                    <div className="entries__nav-controls">
                        <input id="6m"
                               onChange={(e) => changeSort("6m")}
                               hidden type="radio"
                               value="6month"
                               name="data_range" defaultChecked/>
                        <label htmlFor="6m" className="entries__nav-label">
                            6 месяцев
                        </label>
                        <input id="12m"
                               onChange={(e) => changeSort("12m")}
                               hidden type="radio"
                               value="12month" name="data_range"/>
                        <label htmlFor="12m" className="entries__nav-label">
                            12 месяцев
                        </label>
                    </div>
                </div>
                <div >
                    {loadStatus ?
                        showEntries(data)
                        :
                        <Spinner/>
                    }
                </div>
            </div>
        </section>
    )
};

export default Entries;