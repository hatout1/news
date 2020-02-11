const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const db = mongoose.connection
const Article = require("../models/Articles")



router.get("/scrape", (req, res) => {

    axios.get("https://www.nytimes.com/section/technology").then(urlencoded => {
        const $ = cheerio.load(urlencoded.data);
        $("li.css-ye6x8s").each((i, element) => {
            let data = {};

            data.link = "https://www.nytimes.com" + $(element)
                .find('a')
                .attr("href");
            data.title = $(element)
                .find('h2.css-1j9dxys')
                .text();
            data.summary = $(element)
                .find('p.css-1echdzn')
                .text()
            data.picture = $(element)
                .find('img.css-11cwn6f')
                .attr('src')

            let entry = new Article(data);

            entry.save((err, doc) => {
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            });
        });
        res.send("Scrape Complete");
    })


})


router.get("/articles", (req, res) => {
    Article.find({}, (error, doc) => {

        if (error) {
            console.log(error);
        }

        else {
            res.json(doc);
        }
    });
});


router.post("/article", (req, res) => {
    db.Article.create({
        title: data.title,
        summary: data.summary,
        link: data.link,
        picture: data.picture
    }).then(articles => {
        res.send(articles);
        // console.log(articles)
    });

})

router.get("/scrape", (req, res) => {

    axios.get("https://www.nytimes.com/section/technology").then(urlencoded => {
        const $ = cheerio.load(urlencoded.data);
        $("li.css-ye6x8s").each((i, element) => {
            let data = {};

            data.link = "https://www.nytimes.com" + $(element)
                .find('a')
                .attr("href");
            data.title = $(element)
                .find('h2.css-1j9dxys')
                .text();
            data.summary = $(element)
                .find('p.css-1echdzn')
                .text()
            data.picture = $(element)
                .find('img.css-11cwn6f')
                .attr('src')

            let entry = new Article(data);

            entry.save((err, doc) => {
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            });
        });
        res.send("Scrape Complete");
    })


})

module.exports = router;