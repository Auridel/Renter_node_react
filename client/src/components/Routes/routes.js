import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../login/login";
import Account from "../account/account";
import UserPage from "../userPage/userPage";
import AuthContext from "../../context/authContext";

const Routes = () => {
    const {isAuth} = useContext(AuthContext);

    if(isAuth) return (
        <Switch>
            <Route path="/account">
                <Account/>
            </Route>
            <Route path="/user">
                <UserPage/>
            </Route>
            <Redirect to="account"/>
        </Switch>
    );

    return (
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
};

export default Routes;