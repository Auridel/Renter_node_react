const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRouter = require("./routes/login");
const accountRouter = require("./routes/account");
// const {MONGODB_URI} = require("./keys");
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());

app.use(express.json({extended: true}))//json

app.use("/api/auth", loginRouter);
app.use("/api/account", accountRouter);

if(process.env.NODE_ENV === "production"){
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}


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