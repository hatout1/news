const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let NoteSchema = new Schema({
    body: {
        type: String
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});


const Note = mongoose.model("Note", NoteSchema);


module.exports = Note;