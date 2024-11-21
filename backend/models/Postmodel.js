const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    Description: {
        type: String,
        required: true
    },
    labels: {
        type: [{
            lable: { type: String, unique: true }
        }]
    },
    user: { 
        type: mongoose.Types.ObjectId, ref: 'Post' 
    },
    likes: {
        type: Number,
        user: { 
            type: mongoose.Types.ObjectId, ref: 'Post' 
        },
        required: false
    }
})

module.exports = mongoose.model("Post",postschema)