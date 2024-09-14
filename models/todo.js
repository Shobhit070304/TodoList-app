const mongoose = require("mongoose")

mongoose.connect(`mongodb://localhost:27017/todolist`)

const todoScehema = mongoose.Schema({
    title : String,
    date:String,
    task:String,
})

module.exports = mongoose.model("todo", todoScehema);