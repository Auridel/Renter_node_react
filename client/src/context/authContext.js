import React from "react";


const AuthContext = React.createContext({
    isAuth: false,
    token: null,
    service: null,
    login: null,
    logout: null,
    loaded: false
})

export default AuthContext;