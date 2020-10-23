import {useCallback, useState, useEffect} from "react";

const storage = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const login = useCallback((token) => {
        setToken(token);
        localStorage.setItem(storage, JSON.stringify(token));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.setItem(storage, null);
    }, []);

    useEffect(() => {
        console.log(token)
        const storageData = JSON.parse(localStorage.getItem(storage))
        if(storageData && storageData){
            login(storageData);
        }
        setLoaded(true);
    },[login]);

    return {token, loaded, login, logout};
}