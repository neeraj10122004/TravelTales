const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGOURL } = require('./Auth');
const User = require('./models/Usermodel');
const Post = require('./models/Postmodel');

mongoose.connect(MONGOURL);

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Create User
app.post('/user', async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, name });
            await user.save();
            res.status(201).send('User created successfully');
        } else {
            res.status(400).send('User already exists');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create Post
app.post('/post', async (req, res) => {
    const { description, labels, user } = req.body;

    try {
        // Create and save the post
        const post = new Post({ description, labels, user });
        await post.save();

        // Update the user's posts array
        await User.findByIdAndUpdate(
            user, // No need for ObjectId conversion
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).send('Post created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Like Post
app.post('/like', async (req, res) => {
    const { id, user } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 }, $push: { likedBy: user } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            user,
            { $push: { liked: id } },
            { new: true }
        );

        res.status(200).send('Post liked successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
