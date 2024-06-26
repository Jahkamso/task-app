// Schema - all the fields you'll have in your database and the type of values you want


const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
    message: String,
    date: Date
})

module.exports = mongoose.model.Message ?? mongoose.model("Message", MessageSchema) // if model exists use the first, if not, use the second to compile