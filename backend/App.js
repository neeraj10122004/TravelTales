// Express and Middleware Setup
const express = require("express");
const session = require('express-session');
const passport = require("passport");
const mongoose = require('mongoose');
const { PORT, MONGOURL, CLIENT_SECRET, CLIENT_ID } = require('./Auth');
const User = require('./models/Usermodel');
const Post = require('./models/Postmodel');
const bodyParser = require("body-parser");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

// Database Connection
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const app = express();
app.use(cors({
    origin: 'https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io',
    credentials: true,
}));
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

// Passport Configuration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const email = profile.emails?.[0]?.value;
        const photourl = profile.photos?.[0]?.value;

        if (!email || !profile.id) {
            return cb(new Error("Missing required profile information"));
        }

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                googleId: profile.id,
                email,
                name: profile.displayName,
                photourl,
            });
            await user.save();
        }

        cb(null, user);
    } catch (error) {
        cb(error);
    }
}));

// Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/callback", passport.authenticate("google", {
    failureRedirect: "https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io",
}), (req, res) => {
    const redirectUrl = `https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us116.gitpod.io/home?name=${encodeURIComponent(
        req.user.name
    )}&email=${encodeURIComponent(req.user.email)}`;

    res.redirect(redirectUrl);
});

app.get('/user', async (req, res) => {
    try {
        const email = req.query.email || (req.user && req.user.email);

        if (!email) {
            return res.status(400).json({ error: "Email not provided in the request" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ name: user.name, photourl: user.photourl });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
