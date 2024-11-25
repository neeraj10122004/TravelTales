const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: String,
    labels: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);

