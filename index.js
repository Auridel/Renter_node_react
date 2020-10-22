const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login");
const accountRouter = require("./routes/account");
const vars = require("./middlewares/vars");
const {MONGODB_URI, SESSION_SECRET} = require("./keys");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(vars);

app.use("/api/auth", loginRouter);
app.use("/api/account", accountRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;

async function start () {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () =>{
            console.log(`Server is running on port: ${PORT}`);
        })
    }catch (e) {
        console.log(e);
        process.exit(1);
    }
}

start();