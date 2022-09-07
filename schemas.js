const Joi = require('joi');

module.exports.movieSchema = Joi.object({
    movie: Joi.object({
        movieTitle: Joi.string().required(),
        movieDescription: Joi.string().required(),
        //personalRating: Joi.number().required().min(0).max(5) //using slider/stars instead of entering a number
    }).required()
}); 

module.exports.personalReviewSchema = Joi.object({
    personalReview: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});