const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year_published: Date


}, {
    timestamps: true
});

module.exports = mongoose.model('books', NoteSchema);