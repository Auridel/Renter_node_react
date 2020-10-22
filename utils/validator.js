const {body} = require("express-validator");
const User = require("../model/user");

exports.registerValidator = [
    body("email").isEmail().withMessage("Enter correct email").custom(async (value) => {
        try {
            const user = await User.findOne({email: value});
            if(user) return Promise.reject("User already exists");
        }catch (e) {
            console.log(e);
        }
    }).normalizeEmail(),
    body("password", "Password length: 3-25").isLength({min: 3, max: 25}).isAlphanumeric().trim(),
    body("confirm").custom((value, {req}) => {
        if (value !== req.body.password) throw new Error("Password doesn't match");
        return true;
    }),
    body("name").isLength({min: 3, max: 20}).withMessage("Name length: 3-20")
]

exports.loginValidator = [
    body("email").isEmail().withMessage("Enter correct email").custom(async (value) => {
        try {
            const user = await User.findOne({email: value});
            if(!user) return Promise.reject("Email or password is wrong");
        }catch (e) {
            console.log(e);
        }
    }).normalizeEmail(),
    body("password", "Password length: 3-25").isLength({min: 3, max: 25}).isAlphanumeric().trim()
]

exports.addValidator = [
    body("cold_plan", "All values must be a number").isNumeric().trim(),
    body("hot_plan", "All values must be a number").isNumeric().trim(),
    body("day_plan", "All values must be a number").isNumeric().trim(),
    body("night_plan", "All values must be a number").isNumeric().trim(),
    body("cold", "All values must be a number").isNumeric().trim(),
    body("hot", "All values must be a number").isNumeric().trim(),
    body("day", "All values must be a number").isNumeric().trim(),
    body("night", "All values must be a number").isNumeric().trim()
]