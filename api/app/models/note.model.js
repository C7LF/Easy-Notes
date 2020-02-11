const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: String,
    content: Object
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema)