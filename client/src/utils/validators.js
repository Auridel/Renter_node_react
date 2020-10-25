const checkEmail = (value) => {
    const reg = new RegExp(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/gi);
    const res = reg.test(value)
    return res;
};
const checkPass = (value) => {
    if(!value) return false;
    const reg = new RegExp(/^[^\s]+$/ig);
    return (value.length > 2 && reg.test(value));
}

export {
    checkEmail,
    checkPass
}