const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/api/articles", (req, res) => {
    db.Article.find().then(articles => {
        res.send(articles);
    }).catch(err => {
        // res.send(err)
        console.log(err)
    });
});

router.post("/articles", (req, res) => {
    db.Article.create({
        title: data.title,
        summary: data.summary,
        link: data.link,
        picture: data.picture
    }).then(articles => {
        res.send(articles);
        console.log(articles)
    });

})



module.exports = router;