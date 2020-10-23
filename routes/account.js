const {Router} = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const {JWT_SIGN} = require("../keys")
const {addValidator} = require("../utils/validator");
const {validationResult} = require("express-validator");
const Entries = require("../model/entries");
const calculatePrice = require("../utils/calc");

router.get("/get", auth, async (req, res) => {
    try{
        jwt.verify(JSON.parse(req.token).token, JWT_SIGN, async (err, decoded) => {
            if(err) {
                return res.status(403).json("Forbidden! Anauthorized access");
            }
            else {
                // console.log(decoded)
                let entries = await Entries.findOne({userId: decoded.userId}).select("entries");
                const data = entries.toJSON();
                data.userName = decoded.userName;
                data.email = decoded.email;
                console.log(data)
            }
        })
        // let entries = await Entries.findOne({userId: req.session.user._id}).select("entries");
        // if(entries){
        //     data = entries.toJSON();
        //     res.render("account", {
        //         plan: data.entries[data.entries.length - 1].cur_plan,
        //         entries: data.entries
        //     })
        // }else {
        //     res.render("account");
        // }
    }catch (e) {
        console.log(e);
    }
})

router.post("/add", auth, addValidator, async (req, res) => {
    try{
        const userId = req.session.user._id;
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
                res.json({success: "ok"})
            }else {
                const prev = entries.entries[entries.entries.length - 1];
                const current = {
                    date: Date.now(),
                    cur_plan: {cold_plan, hot_plan, day_plan, night_plan},
                    meters: {cold, hot, day, night},
                    price: 0
                }
                current.price = calculatePrice(prev, current);
                await entries.updateOne({entries: [...entries.entries, current]});
                res.redirect("/account");
            }
        }else {
            req.flash("addError", errors.array()[0].msg);
            res.redirect("/account");
        }
    }catch (e) {
        console.log(e);
    }
})

module.exports = router;