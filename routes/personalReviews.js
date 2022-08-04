const express = require('express');
const router = express.Router( { mergeParams: true} ); //tells express router to get the params
const Movie = require('../models/movie');
const PersonalReview = require('../models/personalReview');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError.js');
const { personalReviewSchema } = require('../schemas.js');

const validatePersonalReview = (req, res, next) => {
    const { error } = personalReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validatePersonalReview, catchAsync(async (req,res) => {
    const movie = await Movie.findById(req.params.id);
    const personalReview = new PersonalReview(req.body.personalReview);
    movie.personalReviews.push(personalReview);
    await personalReview.save();
    await movie.save();
    res.redirect(`/movies/${movie._id}`);
}))

router.delete('/:personalReviewId', catchAsync(async (req, res) => {
    const { id, personalReviewId } = req.params;
    await Movie.findByIdAndUpdate(id, { $pull: { personalReviews: personalReviewId } });
    await PersonalReview.findByIdAndDelete(personalReviewId);
    res.redirect(`/movies/${id}`);
}))

module.exports = router;