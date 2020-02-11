const express = require("express");
const router = express.Router();
const path = require("path");
// const db = require("../models");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/savedArticles.html"));
});


module.exports = router;