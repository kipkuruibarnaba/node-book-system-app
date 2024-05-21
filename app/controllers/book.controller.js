const Note = require('../models/book.model.js');

// add and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a book
    const book = new Note({
        title: req.body.title || "Untitled Note",
        author: req.body.author,
        genre: req.body.genre,
        year_published: req.body.year_published,
    });

    // Save Book in the database
    book.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
    // Note.find().
    //sorted
    Note.find().sort({ createdAt: 'desc' })
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
    Note.findById(req.params.bookId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
    // Validate Request

    if (!req.body.title) {
        return res.status(400).send({
            message: "Book title cannot be empty"
        });
    }

    // Find book and update it with the request body
    Note.findByIdAndUpdate(req.params.bookId, {
            title: req.body.title || "Untitled Note",
            author: req.body.author,
            genre: req.body.genre,
            year_published: req.body.year_published
        }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error updating book with id " + req.params.bookId
            });
        });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.bookId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send({ message: "Book deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Could not delete book with id " + req.params.bookId
            });
        });
};