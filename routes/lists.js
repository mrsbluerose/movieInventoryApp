const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies');
const lists = require('../controllers/lists');
const catchAsync = require('../utils/catchAsync');
//const Movie = require('../models/movie');
const { isLoggedIn } = require('../middleware');
const { validateMovie } = require('../middleware');
const { isAuthor } = require('../middleware');


router.route('/')
    .get(catchAsync(lists.index))
    .post(catchAsync(lists.createList))

router.get('/new', isLoggedIn, lists.renderNewForm);

router.route('/:id')
    .get(catchAsync(lists.showList))
    .put(catchAsync(lists.updateList))
    .delete((lists.deleteList))

router.get('/:id/edit', catchAsync(lists.renderEditForm));

module.exports = router;