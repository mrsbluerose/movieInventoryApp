const express = require('express');
const router = express.Router();
const lists = require('../controllers/lists');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

router.get('/', catchAsync(lists.index))

router.post('/create', catchAsync(lists.createList))

router.get('/new', isLoggedIn, lists.renderNewForm);

router.route('/:listId')
    .get(catchAsync(lists.showList))
    .put(catchAsync(lists.updateList))
    .delete((lists.deleteList))

router.get('/:listId/edit', catchAsync(lists.renderEditForm));

module.exports = router;