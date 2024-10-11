const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password);

        req.flash("success", `signed you up as ${newUser.username}`);

        passport.authenticate('local')(req, res, () => {
            res.redirect('/comics');
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/comics',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: "Logged in successfully!"
}));

// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/comics');
// });

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect('/comics');
    });
});

module.exports = router;