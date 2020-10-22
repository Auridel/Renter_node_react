const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const {loginValidator, registerValidator} =require("../utils/validator");
const {validationResult} = require("express-validator");


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
})

router.post("/auth", loginValidator, async (req, res) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash("loginError", errors.array()[0].msg)
            return res.redirect("/login#login");
        }else {
            const user = await User.findOne({email: email});
            const checkPass = await bcrypt.compare(password, user.password);
            if(checkPass){
                req.session.user = user;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if(err) throw err;
                    res.redirect("/account");
                })
            }else {
                req.flash("loginError", "Email or password is wrong")
                res.redirect("/login");
            }
        }
    }catch (e) {
        console.log(e)
    }
})

router.post("/register", registerValidator, async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash("registerError", errors.array()[0].msg);
            return res.redirect("/login#register");
        }else {
            const hashPass = await bcrypt.hash(password, 10);
            const user = new User({email, password: hashPass, name});
            await user.save();
            res.redirect("/login");
        }
    }catch (e) {
        console.log(e);
    }
})

module.exports = router;