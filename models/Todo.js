const mongoose = require(`mongoose`)

// defining todo schema
const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: String,
}, {timestamps: true})


// todo model
const Todo = mongoose.model(`todo`, todoSchema)

module.exports = Todo