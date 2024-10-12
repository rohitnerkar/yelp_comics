const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require("dotenv");
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
dotenv.config();
const connectMongoDb = require('./utils/mongodb');

const { port } = require('./config');

const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

connectMongoDb();

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json({
    type: ["application/json", "test/plain"]
}));

app.use(expressSession({
    secret: "dfhdgfkadfgadkfghadkfaehgkfadjhfakfgeifbadkjfheskfjdshgksgbsdkjgh",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
});

app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/comments", commentRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));