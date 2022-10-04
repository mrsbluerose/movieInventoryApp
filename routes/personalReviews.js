// const express = require('express');
// const router = express.Router( { mergeParams: true} ); //tells express router to get the params
// const personalReviews = require('../controllers/personalReviews');
// const catchAsync = require('../utils/catchAsync');
// const { validatePersonalReview , isLoggedIn, isPersonalReviewAuthor} = require('../middleware')

// router.post('/', isLoggedIn, validatePersonalReview, catchAsync(personalReviews.createPersonalReview));

// router.delete('/:personalReviewId', isLoggedIn, isPersonalReviewAuthor, catchAsync(personalReviews.deletePersonalReview));

// module.exports = router;