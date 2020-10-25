const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRouter = require("./routes/login");
const accountRouter = require("./routes/account");
const {MONGODB_URI} = require("./keys");

const app = express();
app.use(cors());

app.use(express.json({extended: true}))//json

app.use("/api/auth", loginRouter);
app.use("/api/account", accountRouter);


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
        // process.exit(1);
        setTimeout(start, 5000);
    }
}

start();