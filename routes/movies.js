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
    res.redirect(`/movies/${movie._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id).populate('personalReviews');
    res.render('movies/show', { movie });
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { movie });
}))

router.put('/:id', validateMovie, catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`/movies/${movie._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
}))

module.exports = router;