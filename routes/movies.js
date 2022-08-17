const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { movieSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Movie = require('../models/movie');

const validateMovie = (req, res, next) => {
    const { error } = movieSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies });
}))

router.get('/new', (req, res) => {
    res.render('movies/new');
})

router.post('/', validateMovie, catchAsync(async (req, res, next) => {
    //if(!req.body.movie) throw new ExpressError('Invalid Movie data', 400);
    const movie = new Movie(req.body.movie);
    await movie.save();
    req.flash('success', 'New movie created!');
    res.redirect(`/movies/${movie._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id).populate('personalReviews');
    if(!movie){
        req.flash('error', 'Cannot find that movie')
        return res.redirect('/movies');
    } 
    res.render('movies/show', { movie });
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        req.flash('error', 'Cannot find that movie')
        return res.redirect('/movies');
    } 
    res.render('movies/edit', { movie });
}))

router.put('/:id', validateMovie, catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    req.flash('success', 'Movie Updated!');
    res.redirect(`/movies/${movie._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    req.flash('success', 'Movie deleted!');
    res.redirect('/movies');
}))

module.exports = router;