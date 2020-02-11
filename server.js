const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connection;
const logger = require("morgan");
const path = require("path");

const axios = require("axios");
const cheerio = require("cheerio");

const colors = require('colors')

const PORT = process.env.PORT || 3018;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/hw18_wsDB";

mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
    console.log("connected to db instance");
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set('public', __dirname + '/public');


app.use(logger("dev"))

const savedRoutes = require("./routes/savedRoutes")
app.use("/saved", savedRoutes)
const articlesRoutes = require("./routes/articlesRoutes");
app.use("/api", articlesRoutes);
const apiRoutes = require("./routes/apiRoutes");
app.use("/", apiRoutes);





app.listen(PORT, () => {
    console.log(`App listening: http://localhost:${PORT}`);
});