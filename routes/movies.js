const express = require('express');
const router = express.Router({mergeParams: true});
const movies = require('../controllers/movies');
const catchAsync = require('../utils/catchAsync');
//const Movie = require('../models/movie');
const { isLoggedIn, validateMovie, isAuthor, testPrint } = require('../middleware');


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

router.post('/', isLoggedIn, validateMovie, /*testPrint,*/ catchAsync(movies.addMovie)); //Test Print: params did not make it from the router

router.delete('/:movieId', isLoggedIn, isAuthor, catchAsync(movies.deleteMovie));

module.exports = router;