const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    const checkAuth = require('../middleware/check-auth');

    // Create a new Note
    app.post('/api/notes', passport.authenticate('jwt', { session: false }), checkAuth, notes.create);

    // Retrieve all Notes
    app.get('/api/notes', passport.authenticate('jwt', { session: false }), checkAuth, notes.findAllByAuthor);

    // Retrieve a single Note with noteId
    app.get('/api/notes/:noteId', passport.authenticate('jwt', { session: false }), checkAuth, notes.findOne);

    // Update a Note with noteId
    app.put('/api/notes/:noteId', passport.authenticate('jwt', { session: false }), checkAuth, notes.update);

    // Delete a Note with noteId
    app.delete('/api/notes/:noteId', passport.authenticate('jwt', { session: false }), checkAuth, notes.delete);
}