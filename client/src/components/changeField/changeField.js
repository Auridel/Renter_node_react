import React from "react";

import "./changeField.scss";

const ChangePlan = ({item, value, setter, trigger, errorHandler = null}) => {
    return (
        <div className="plan__change">
            <input
                onInput={(e) => {
                    e.target.value = e.target.value.trim().replace(/[^.\d]/g, "");
                    if(errorHandler) errorHandler(item, e.target.value);
                    else setter({...value, [item]: e.target.value});
                }}
                onBlur={() => {trigger(null)}}
                onKeyPress={(e) => {
                    if(e.key === "Enter" || e.key === "Escape") trigger(null);
                }}
                autoFocus
                defaultValue={value[item]}
                className="plan__input"
                type="text" />
        </div>
    )
}

export default ChangePlan;