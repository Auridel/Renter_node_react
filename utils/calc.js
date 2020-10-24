module.exports.calculatePrice = function (prev, cur){
    return (cur.meters.cold - prev.meters.cold) * cur.cur_plan.cold_plan +
        (cur.meters.hot - prev.meters.hot) * cur.cur_plan.hot_plan +
        ((cur.meters.cold - prev.meters.cold) + (cur.meters.hot - prev.meters.hot)) * cur.cur_plan.cold_plan +
        (cur.meters.day - prev.meters.day) * cur.cur_plan.day_plan +
        (cur.meters.night - prev.meters.night) * cur.cur_plan.night_plan;
}

module.exports.validateData = function (prev, current) {
    for (let key in prev){
        if(prev[key] > current[key]) return false;
    }
    return true;
}