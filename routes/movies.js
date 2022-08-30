const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies');
const catchAsync = require('../utils/catchAsync');
//const Movie = require('../models/movie');
const { isLoggedIn } = require('../middleware');
const { validateMovie } = require('../middleware');
const { isAuthor } = require('../middleware');


router.route('/')
    .get(catchAsync(movies.index))
    .post(isLoggedIn, validateMovie, catchAsync(movies.createMovie))

router.get('/new', isLoggedIn, movies.renderNewForm);

router.route('/:id')
    .get(catchAsync(movies.showMovie))
    .put(isLoggedIn, isAuthor, validateMovie, catchAsync(movies.updateMovie))
    .delete(isLoggedIn, isAuthor, catchAsync(movies.deleteMovie))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(movies.renderEditForm));

module.exports = router;