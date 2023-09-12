// install packages: express, mysql, sequelize, express-handlebars, nodemon, dotenv
const express = require("express");
const { engine } = require("express-handlebars");

const routes = require("./controllers");
const path = require("path");
const session = require("express-session");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.engine("handlebars", engine( {
    defaultLayout: "",
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "views/layouts"),
}));
app.set("view engine", "handlebars");
// app.set("views", path.join(__dirname, "views"));

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(sess));

app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
})