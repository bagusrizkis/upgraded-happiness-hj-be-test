const express = require("express");
const errorHandler = require("strong-error-handler");
const routes = require("./routes");
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extends: true }));

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

app.use("/v1/", routes);

app.use(
    errorHandler({
        debug: process.env.NODE_ENV !== "production",
        log: true,
    })
);

module.exports.app = app;
