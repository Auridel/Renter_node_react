import React from "react";
import Plan from "../plan/plan";
import Entries from "../entries/entries";

import "./account.scss";

const Account = () => {
    return (
        <>
            <Plan/>
            <button className="add-btn">Добавить показания</button>
            <Entries/>
        </>
    )
};

export default Account;