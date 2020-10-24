const {Router} = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const {JWT_SIGN} = require("../keys")
const {addValidator} = require("../utils/validator");
const {validationResult} = require("express-validator");
const Entries = require("../model/entries");
const {calculatePrice, validateData} = require("../utils/calc");

router.get("/get", auth, async (req, res) => {
    try{
        jwt.verify(JSON.parse(req.token).token, JWT_SIGN, async (err, decoded) => {
            if(err) {
                return res.status(403).json({message: "Forbidden! Unauthorized access"});
            }
            else {
                // console.log(decoded)
                let entries = await Entries.findOne({userId: decoded.userId}).select("entries");
                if(!!entries) {
                    const data = entries.toJSON();
                    data.userName = decoded.userName;
                    data.email = decoded.email;
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
                                date: Date.now(),
                                cur_plan: {cold_plan, hot_plan, day_plan, night_plan},
                                meters: {cold, hot, day, night}
                            }]
                        });
                        entries.save()
                        res.status(200).json(entries);
                    }else {
                        const prev = entries.entries[entries.entries.length - 1];
                        const current = {
                            date: Date.now(),
                            cur_plan: {cold_plan, hot_plan, day_plan, night_plan},
                            meters: {cold, hot, day, night},
                            price: 0
                        }
                        if(!validateData(prev.meters.toJSON(), current.meters)) return res.status(400).json({message: "Incorrect data"})
                        current.price = calculatePrice(prev, current);
                        await entries.updateOne({entries: [...entries.entries, current]});
                        res.status(200).json({message: "ok"});
                    }
                }else {
                    req.status(400).json({message: errors.array()[0].msg});
                }
            }
        })
    }catch (e) {
        console.log(e);
    }
})

module.exports = router;