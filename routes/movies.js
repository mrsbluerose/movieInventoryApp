const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Movie = require('../models/movie');
const { isLoggedIn } = require('../middleware');
const { validateMovie } = require('../middleware');
const { isAuthor } = require('../middleware');

router.get('/', catchAsync(async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies });
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('movies/new');
})

router.post('/', isLoggedIn, validateMovie, catchAsync(async (req, res, next) => {
    const movie = new Movie(req.body.movie);
    movie.author = req.user._id;
    await movie.save();
    req.flash('success', 'New movie created!');
    console.log(`${movie._id}`)
    res.redirect(`/movies/${movie._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id).populate({
        path: 'personalReviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!movie){
        req.flash('error', 'Cannot find that movie')
        return res.redirect('/movies');
    } 
    res.render('movies/show', { movie });
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if(!movie){
        req.flash('error', 'Cannot find that movie')
        return res.redirect('/movies');
    } 
    res.render('movies/edit', { movie });
}))

router.put('/:id', isLoggedIn, isAuthor, validateMovie, catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    req.flash('success', 'Movie Updated!');
    res.redirect(`/movies/${movie._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    req.flash('success', 'Movie deleted!');
    res.redirect('/movies');
}))

module.exports = router;