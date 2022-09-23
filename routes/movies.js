const express = require('express');
const router = express.Router({mergeParams: true});
const movies = require('../controllers/movies');
const catchAsync = require('../utils/catchAsync');
//const Movie = require('../models/movie');
const { isLoggedIn, validateMovie, isMovieAuthor } = require('../middleware');
const { Router } = require('express');


// router.route('/')
//     .get(catchAsync(movies.index))
//     .post(isLoggedIn, validateMovie, catchAsync(movies.createMovie))

// router.get('/new', isLoggedIn, movies.renderNewForm);

// router.route('/:id')
//     .get(catchAsync(movies.showMovie))
//     .put(isLoggedIn, isAuthor, validateMovie, catchAsync(movies.updateMovie))
//     .delete(isLoggedIn, isAuthor, catchAsync(movies.deleteMovie))

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(movies.renderEditForm));


//router.post('/', isLoggedIn, catchAsync(movies.addMovie));
//router.get('/search', catchAsync(movies.search));

// router.post('/', /*isLoggedIn, validateMovie,*/ catchAsync(movies.addMovie)); /////temp change to search

// router.post('/', /*isLoggedIn, /*validateMovie,*/ catchAsync(movies.searchMovie)); ///// temp

router.route('/')
    .post(/*isLoggedIn, /*validateMovie,*/ catchAsync(movies.searchMovie))
    .put(/*isLoggedIn, validateMovie,*/ catchAsync(movies.addMovie))

router.delete('/:movieId', isLoggedIn, isMovieAuthor, catchAsync(movies.deleteMovie));

module.exports = router;