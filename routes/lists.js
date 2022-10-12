const express = require('express');
const router = express.Router({mergeParams: true});
const lists = require('../controllers/lists');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isListAuthor, isListCollaborator } = require('../middleware');

router.get('/', isLoggedIn, catchAsync(lists.index))

router.post('/create', isLoggedIn, catchAsync(lists.createList))

router.get('/new', isLoggedIn, lists.renderNewForm);

router.route('/:listId')
    .get(isLoggedIn, catchAsync(lists.showList))
    .put(isLoggedIn, isListAuthor, catchAsync(lists.updateList))
    .delete(isLoggedIn, isListAuthor, (lists.deleteList))

router.get('/:listId/sort', isLoggedIn, catchAsync(lists.sortList))

router.get('/:listId/edit', isLoggedIn, isListAuthor, catchAsync(lists.renderEditForm));

module.exports = router;