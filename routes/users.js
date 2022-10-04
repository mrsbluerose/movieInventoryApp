const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
//const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.post('/:listId', users.addCollaborator);

module.exports = router;