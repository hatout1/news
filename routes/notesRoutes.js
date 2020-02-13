const express = require("express");
const router = express.Router();
const db = require("../models");
const Note = require("../models/Notes");
const Article = require("../models/Articles")

// Create a new note
router.post("/save/:id", (req, res) => {
    const newNote = new Note({
        body: req.body.text,
        article: req.params.id
    });
    console.log("line 13" + req.body.text)
    console.log("line 14" + newNote)

    newNote.save((error, note) => {
        if (error) {
            console.log(error);
        }
        else {
            Article.findOneAndUpdate(
                {
                    "_id": req.params.id
                },
                {
                    $push: { "notes": note }
                }).then(article => {
                    // console.log(res)
                    res.send({ article, note })
                })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(note);
                    }
                });
        }
    });
});


// Get all notes for each article
router.get("/save/All/:article_id", (req, res) => {
    console.log("fetch notes: " + req.params.article_id)
    Note.find({ "article": req.params.article_id }).then(notes => {
        console.log("notes fetched: " + notes)
        res.send(notes)
    }).catch(err => {
        console.log("err fetching notes: " + err)
        res.send(err)
    });
});



// Delete a note
router.delete("/notes/delete/:note_id/:article_id", (req, res) => {
    Note.findOneAndRemove({ "_id": req.params.note_id }, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            Article.findOneAndUpdate(
                {
                    "_id": req.params.article_id
                },
                {
                    $pull: {
                        "notes": req.params.note_id
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    });
});






module.exports = router;