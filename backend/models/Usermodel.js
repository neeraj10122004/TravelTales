const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
