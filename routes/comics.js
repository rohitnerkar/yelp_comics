const express = require('express');
const router = express.Router();
const Comic = require('../models/comic');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkComicOwner = require("../utils/checkComicOwner");

router.get("/", async (req, res) => {
    console.log(req.user);
    try {
        const comics = await Comic.find().exec();
        res.render("comics", {comics});
    } catch (error) {
        console.log(error);
        res.send("you broke it.../index");
    }    
});

router.post("/", isLoggedIn, async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const newComic = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre,
        color: !!req.body.color,
        image_link: req.body.image_link,
        owner: {
            id: req.user._id,
            username: req.user.username
        }
    }
    try {
        const comic = await Comic.create(newComic);
        console.log(comic);
        res.redirect("comics/" + comic._id);
    } catch (error) {
        console.log(error);
        res.send("you broke it.../comics POST");
    }
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("comics_new")
});

router.get("/search", async (req, res) => {
    try {
        const comics = await Comic.find({
            $text: {
                $search: req.query.term
            }
        });
        res.render("comics", {comics});
    } catch (error) {
        console.log(error);
        res.send("Broken search")
    }
});

router.get("/:id", async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id).exec();
        const comments = await Comment.find({ comicId: req.params.id });      
        res.render("comics_show", { comic, comments });
    } catch (error) {
        console.log(error);
        res.send("you broke it.../comics/:id");
    }
});

router.get("/:id/edit", checkComicOwner, async (req, res) => {
    const comic = await Comic.findById(req.params.id).exec();
    res.render("comics_edit", {comic});
});

router.put("/:id", checkComicOwner, async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const comicBody = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre,
        color: !!req.body.color,
        image_link: req.body.image_link
    }

    try {
        const comic = await Comic.findByIdAndUpdate(req.params.id, comicBody, {new: true}).exec();
        res.redirect(`/comics/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.send("you broke it.../comics/id PUT");
    }
});

router.delete("/:id", checkComicOwner, async (req, res) => {
    try {
        const deletedComic = await Comic.findByIdAndDelete(req.params.id).exec();
    console.log("Deleted:", deletedComic)
    res.redirect("/comics");
    } catch (error) {
        console.log(error);
        res.send("you broke it.../comics/id DELETE");   
    }
});


module.exports = router;