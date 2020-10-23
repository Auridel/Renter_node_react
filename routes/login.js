const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {loginValidator, registerValidator} =require("../utils/validator");
const {validationResult} = require("express-validator");
const {JWT_SIGN} = require("../keys");



router.post("/login", loginValidator, async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body)               ///dev
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()[0].msg, message: "Incorrect data!"});
        }else {
            const user = await User.findOne({email: email});
            const checkPass = await bcrypt.compare(password, user.password);
            if(checkPass){
                const token = jwt.sign({
                    userId: user._id,
                    userName: user.name,
                    email: user.email
                }, JWT_SIGN, {expiresIn: "1h"});
                res.json({token});
            }else {
                res.status(400).json({message: "Email or password is wrong"});
            }
        }
    }catch (e) {
        console.log(e)
        res.status(500).json({message: "Something goes is wrong"});
    }
})

router.post("/register", registerValidator, async (req, res) => {
    try {
        const {email, name, password} = req.body;
        console.log(req.body)               ///dev
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()[0].msg, message: "Incorrect data!"});
        }else {
            const hashPass = await bcrypt.hash(password, 10);
            const user = new User({email, password: hashPass, name});
            await user.save();
            res.status(200).json({message: "success"})
        }
    }catch (e) {
        console.log(e);
        res.status(500).json({message: "Something goes is wrong"});
    }
})

module.exports = router;