const Joi = require('joi');

module.exports.movieSchema = Joi.object({
    movie: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        personalRating: Joi.number().required().min(0).max(5)
    }).required()
}); 