const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    message: { type: String, required: true },
    datePost: { type: Date, required: true },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model("Post", postSchema);