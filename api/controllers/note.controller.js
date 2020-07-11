const Note = require('../models/note.model.js')

const checkAuth = require('../middleware/check-auth');

// Creating and saving new note
exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Note cannot be empty"
        })
    }

    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        label: req.body.label
    })

    note.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured."
        })
    })
}

// find and return all notes
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while fetching notes."
        })
    })
}

// find note with Id
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send(note)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })
}

// update notes
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        label: req.body.label
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        })
    })
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })              
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        })
    })
}