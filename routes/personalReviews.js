const express = require('express');
const router = express.Router( { mergeParams: true} ); //tells express router to get the params
//const Movie = require('../models/movie');
//const PersonalReview = require('../models/personalReview');
const personalReviews = require('../controllers/personalReviews');
const catchAsync = require('../utils/catchAsync');
//const ExpressError = require('../utils/ExpressError');
//const { personalReviewSchema } = require('../schemas.js');
const { validatePersonalReview , isLoggedIn, isPersonalReviewAuthor} = require('../middleware')

router.post('/', isLoggedIn, validatePersonalReview, catchAsync(personalReviews.createPersonalReview));

router.delete('/:personalReviewId', isLoggedIn, isPersonalReviewAuthor, catchAsync(personalReviews.deletePersonalReview));

module.exports = router;