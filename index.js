const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const loginRouter = require("./routes/login");
const accountRouter = require("./routes/account");
const vars = require("./middlewares/vars");
const {MONGODB_URI, SESSION_SECRET} = require("./keys");

const app = express();
const hbs = exhbs.create({
    defaultLayout: "main.hbs",
    extname: "hbs"
});

const store = new MongodbStore({
    collection: "sessions",
    uri: MONGODB_URI
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf());
app.use(flash());
app.use(vars);

app.use("/login", loginRouter);
app.use("/account", accountRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

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
    }
}

start();