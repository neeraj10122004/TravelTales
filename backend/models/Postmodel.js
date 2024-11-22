const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    labels: {
        type: [String], // Array of strings
        required: false
    },
    user: { 
        type: mongoose.Types.ObjectId,
        ref: 'User', // Fixed reference to 'User'
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Post", postSchema);
