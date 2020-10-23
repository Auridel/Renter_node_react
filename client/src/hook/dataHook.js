import {useState} from "react";


export const useData = () => {
    const [loadStatus, setLoadStatus] = useState(false);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState([]);

    const loadReady =(state) => {
        setLoadStatus(state);
    }

    const updateData = (entries) => {
        setData(entries);
    }

    const updateErrors = (error) => {
        setErrors([...errors, error]);
    }

    const clearErrors = () => {
        setErrors([]);
    }

    return {loadStatus, loadReady, data, updateData, errors, updateErrors, clearErrors}
}