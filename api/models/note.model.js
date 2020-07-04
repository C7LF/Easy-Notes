const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    label: [{
        type: String,
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema)