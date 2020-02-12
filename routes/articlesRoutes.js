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


            Article.find({
                title: data.title
            }).then(articles => {
                if (articles.length > 0) {
                    console.log("Every thing is up to date")
                } else {
                    entry.save((err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(doc);
                        }
                    });
                }
            });
        });
        res.send("Scrape Complete");
    })
})

// All articles
router.get("/articles", (req, res) => {
    Article.find({ "saved": false }, (error, doc) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json(doc);
        }
    });
});

// All saved articles
router.get("/savedArticles", (req, res) => {
    Article.find({ "saved": true }, (error, doc) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json(doc);
        }
    });
});


// delete All articles
router.delete("/delete", (req, res) => {
    Article.remove({ "saved": false }, (error, doc) => {
        res.send(doc)
    })

})

router.delete("/deleteAllSavedArticles", (req, res) => {
    Article.remove({ "saved": true }, (error, doc) => {
        res.send(doc)
    })

})


// Save an Article
router.post("/toSave/:id", (req, res) => {
    Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true }).then(res => {
        console.log(res)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });
});



// Delete a saved article
router.post("/deleteSave/:id", (req, res) => {
    Article.findOneAndUpdate(
        {
            "_id": req.params.id
        },
        {
            "saved": false, "notes": []
        }).then(res => {
            console.log(res)
        }).catch(err => {
            // Log any errors
            if (err) {
                console.log(err);
            }
        });
});



module.exports = router;