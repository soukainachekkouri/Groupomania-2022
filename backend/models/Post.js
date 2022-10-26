const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    message: { type: String, required: true },
    datePost: { type: Date, required: true },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: true },
    //systeme de like
});

module.exports = mongoose.model("Post", postSchema);