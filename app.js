const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require("dotenv");
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
dotenv.config();

const {config, port} = require('./config');

const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

const Comic = require('./models/comic');
const Comment = require('./models/comment');
const User = require('./models/user');

// app.use(morgan('tiny'));

// const seed = require('./utils/seed');
// seed();

app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect(config.connectionUrl);// {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

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


app.listen(port, () => {
    console.log("yelp_comics is running...");
});




// const comics = [
//     {
//         title: "Watchmen",
//         description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzIzAmdnGHdcJVjn1SVtltYebLRlLa0sr5A&s"
//     },
//     {
//         title: "Batman",
//         description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
//         image: "https://static.dc.com/2024-03/bat_hub_hero_bm85_4x3f.png"
//     },
//     {
//         title: "Y: The Last Man",
//         description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
//         image: "https://m.media-amazon.com/images/M/MV5BMzkxM2ViNTYtMjgzYS00NDM0LWI5YWEtNWZiOTI3YmU4Yjk5XkEyXkFqcGc@._V1_.jpg"
//     },
// ]