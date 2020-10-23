import React from "react";

const DataContext = React.createContext({
    loadStatus: false,
    loadReady: null,
    data: null,
    updateErrors: null,
    clearErrors: null,
    errors: false
})

export default DataContext;