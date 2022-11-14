const express = require('express');
const router = express.Router({mergeParams: true});
const movies = require('../controllers/movies');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isListCollaborator, isMovieAuthor } = require('../middleware');
const { Router } = require('express');

router.route('/')
    .post(isLoggedIn, isListCollaborator, catchAsync(movies.searchMovie))
    .put(isLoggedIn, isListCollaborator, catchAsync(movies.addMovie))

router.delete('/:movieId', isListCollaborator, isLoggedIn, isMovieAuthor, catchAsync(movies.deleteMovie));

module.exports = router;