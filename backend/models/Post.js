const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    //date: { type: Date, required: true },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);