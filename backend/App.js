const express = require("express");
const session = require('express-session');
const passport = require("passport");
const mongoose = require('mongoose');
const { PORT, MONGOURL ,CLIENT_SECRET ,CLIENT_ID } = require('./Auth');
const User = require('./models/Usermodel'); // Ensure this model has the necessary fields
const Post = require('./models/Postmodel'); // Ensure this model is properly defined
const bodyParser = require("body-parser");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var userprofile = {};

// Database Connection
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Express Setup
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "YourSecretKey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization/Deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});


passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io/callback"
    
},
async function(accessToken, refreshToken, profile, cb) {
    try {
        // Find the user by Google ID
        let user = await User.findOne({ googleId: profile.id });

        // If the user doesn't exist, create a new one
        if (!user) {
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
            });
            
            await user.save();
        }
        userprofile=profile;

        return cb(null, user);
    } catch (error) {
        return cb(error);
    }
}));


// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/callback",
    passport.authenticate("google", { failureRedirect: "https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io/signin" }),
    (req, res) => {
        console.log(userprofile);
        res.redirect("https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io/")});

// Routes
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
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).send('Invalid user ID');
        }
        const post = new Post({ description, labels, user });
        await post.save();
        await User.findByIdAndUpdate(user, { $push: { posts: post._id } }, { new: true });
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
        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID(s)');
        }
        const post = await Post.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 }, $addToSet: { likedBy: user } },
            { new: true }
        );
        if (!post) return res.status(404).send('Post not found');

        await User.findByIdAndUpdate(
            user,
            { $addToSet: { liked: id } },
            { new: true }
        );

        res.status(200).send('Post liked successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Default Route
app.get("/", (req, res) => res.send("Welcome to the app!"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

