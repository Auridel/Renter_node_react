import React from "react";


const AuthContext = React.createContext({
    isAuth: false,
    token: null,
    service: null,
    login: null,
    logout: null,
    loaded: false,
    dataLoaded: false,
    entries: null
})

export default AuthContext;