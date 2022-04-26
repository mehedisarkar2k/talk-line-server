// external imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

// internal imports
const config = require("../config");
const router = require("./routes");

const app = express();

mongoose
    .connect(config.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// session
const sessionStore = new MongoStore({
    mongoUrl: config.db_url,
    collection: "sessions",
});

app.use(
    expressSession({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            // maxAge: 24 * 60 * 60 * 1000, //1D = 1 * 24H = 24 * 60M = 24 * 60 * 60S = 24 * 60 * 60 * 1000ms
            maxAge: 60 * 60 * 1000,
            // maxAge: 60 * 1000,
        },
    })
);

app.use(cookieParser());

// route handler
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the server");
});

app.use("/api", router);

// common error handlers
app.use((req, res, next) => {
    next({
        status: 404,
        message: "Requested url not found",
    });
});

// default error handler
app.use((err, req, res, next) => {
    // check if the header already send
    if (res.headersSent) {
        return next("There was an error");
    }

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        error: true,
        message,
    });
});

module.exports = app;
