import React, {useContext, useEffect} from "react";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
import Login from "../login/login";
import Account from "../account/account";
import UserPage from "../userPage/userPage";
import AuthContext from "../../context/authContext";
import {useTransition, animated} from 'react-spring';

const Routes = () => {
    const {isAuth} = useContext(AuthContext);

    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: 'translate3d(50%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: { position: "absolute", opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })
    useEffect(() => {
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = "";
        }, 390);
    }, [location])

    if(isAuth) return (
        transitions.map(({ item: location, props, key }) => (
            <animated.div key={key} style={props}>

                <Switch location={location}>
                    <Route path="/account">
                        <Account/>
                    </Route>
                    <Route path="/user">
                        <UserPage/>
                    </Route>
                    <Redirect to="account"/>
                </Switch>

            </animated.div>))
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