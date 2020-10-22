let instance = M.Tabs.init(document.querySelectorAll(".tabs"));
const setDate = (date) => {
    return Intl.DateTimeFormat("en-En", {
        day: "2-digit", month: "long", year: "numeric"
    }).format(new Date(date));
}
const toCurrency = (price) => {
    console.log(price)
    return new Intl.NumberFormat("en-EN", {
        currency: "rub",
        style: "currency"
    }).format(Math.floor(price));
}

document.querySelectorAll(".date").forEach(el => el.textContent = setDate(el.textContent));
document.querySelectorAll(".price").forEach(el => el.textContent = toCurrency(+el.textContent));