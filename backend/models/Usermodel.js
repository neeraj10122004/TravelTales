const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    liked: [{ type: mongoose.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', userschema);
