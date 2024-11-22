const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    description: { type: String, required: true },
    labels: [{ label: { type: String } }],
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Post', postschema);
