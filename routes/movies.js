const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies');
const catchAsync = require('../utils/catchAsync');
//const Movie = require('../models/movie');
const { isLoggedIn } = require('../middleware');
const { validateMovie } = require('../middleware');
const { isAuthor } = require('../middleware');

router.get('/', catchAsync(movies.index));

router.get('/new', isLoggedIn, movies.renderNewForm);

router.post('/', isLoggedIn, validateMovie, catchAsync(movies.createMovie));

router.get('/:id', catchAsync(movies.showMovie));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(movies.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateMovie, catchAsync(movies.updateMovie));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(movies.deleteMovie));

module.exports = router;