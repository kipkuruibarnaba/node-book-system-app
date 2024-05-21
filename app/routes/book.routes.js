module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    // Create a new Note
    app.post('/books', books.create);

    // Retrieve all Notes
    app.get('/books', books.findAll);

    // Retrieve a single Note with noteId
    app.get('/books/:bookId', books.findOne);

    // Update a Note with noteId
    app.put('/books/:bookId', books.update);

    // Delete a Note with noteId
    app.delete('/books/:bookId', books.delete);
}