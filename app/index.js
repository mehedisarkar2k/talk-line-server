// external imports
const express = require("express");
const mongoose = require("mongoose");

// internal imports
const config = require("../config");
const router = require("./routes");

mongoose.connect(
    config.db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("connected to db");
    }
);

const app = express();

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

module.exports = { app, express };
