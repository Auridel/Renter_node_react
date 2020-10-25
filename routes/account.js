const {Router} = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
// const {JWT_SIGN} = require("../keys")
const JWT_SIGN = process.env.JWT_SIGN;
const {addValidator} = require("../utils/validator");
const {validationResult} = require("express-validator");
const Entries = require("../model/entries");
const {calculatePrice, validateData, calcFirst} = require("../utils/calc");

router.get("/get", auth, async (req, res) => {
    try{
        jwt.verify(JSON.parse(req.token).token, JWT_SIGN, async (err, decoded) => {
            if(err) {
                return res.status(403).json({message: "Forbidden! Unauthorized access"});
            }
            else {
                let entries = await Entries.findOne({userId: decoded.userId}).populate("userId", "name email");
                if(!!entries) {
                    const data = {
                        userName: entries.userId.name,
                        email: entries.userId.email,
                        entries: entries.entries
                    }
                    return res.status(200).json(data);
                }
                else {
                    const data = {
                        userName: decoded.userName,
                        email: decoded.email,
                        entries: []
                    }
                    return res.status(200).json(data);
                }
            }
        })
    }catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something goes is wrong"});
    }
})

router.post("/add", auth, addValidator, async (req, res) => {
    try{
        jwt.verify(JSON.parse(req.token).token, JWT_SIGN, async (err, decoded) => {
            if(err) return res.status(403).json({message: "Forbidden! Unauthorized access"});
            else {
                const userId = decoded.userId;
                const {cold_plan, hot_plan, day_plan, night_plan, cold, hot, day, night} = req.body;
                const errors = validationResult(req);
                if(errors.isEmpty()){
                    let entries = await Entries.findOne({userId})
                    if(!entries) {
                        entries = new Entries({
                            userId,
                            entries:[{
                                timestamp: Date.now(),
                                date: Date.now(),
                                cur_plan: {cold_plan, hot_plan, day_plan, night_plan},
                                meters: {cold, hot, day, night}
                            }]
                        });
                        entries.entries[0].price = calcFirst(entries.entries[0]);
                        entries.save()
                        return res.status(200).json(entries);
                    }else {
                        const current = {
                            timestamp: Date.now(),
                            date: Date.now(),
                            cur_plan: {cold_plan, hot_plan, day_plan, night_plan},
                            meters: {cold, hot, day, night},
                            price: 0
                        }
                        if(entries.entries.length) {
                            const prev = entries.entries[entries.entries.length - 1];
                            if (!validateData(prev.meters.toJSON(), current.meters)) return res.status(400).json({message: "Incorrect data"})
                            current.price = calculatePrice(prev, current);
                            await entries.updateOne({entries: [...entries.entries, current]});
                            return res.status(200).json({message: "ok"});
                        }
                        else {
                            current.price = calcFirst(current);
                            await entries.updateOne({entries: [...entries.entries, current]});
                            return res.status(200).json({message: "ok"});
                        }
                    }
                }else {
                    return req.status(400).json({message: errors.array()[0].msg});
                }
            }
        })
    }catch (e) {
        console.log(e);
        res.status(500).json({message: "Something goes is wrong"});
    }
})

router.post("/del", auth, async (req, res) => {
    try{
        jwt.verify(JSON.parse(req.token).token, JWT_SIGN, async (err, decoded) => {
            if(err) return res.status(403).json({message: "Forbidden! Unauthorized access"});
            else {
                const userId = decoded.userId;
                const {timestamp} = req.body;
                const data = await Entries.findOne({userId});
                if(!data) return res.status(400).json({message: "No such data"});
                else {
                    data.entries = [...data.entries.filter(el => el.timestamp !== timestamp)];
                    await data.save();
                    res.status(200).json({message: "ok"});
                }
            }
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({message: "Something goes is wrong"});
    }
})

module.exports = router;