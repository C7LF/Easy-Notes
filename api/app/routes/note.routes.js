module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/api/v1/notes', notes.create);

    // Retrieve all Notes
    app.get('/api/v1/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/v1/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/api/v1/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/api/v1/notes/:noteId', notes.delete);
}