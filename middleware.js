const { movieSchema, personalReviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Movie = require('./models/movie');
const PersonalReview = require('./models/personalReview');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isCollaborator = async (req, res, next) => {
    const { id, listId } = req.params;
    const list = await List.findById(listId);
    const collaborators = list.listOfCollaborators;
    if (!list.listAuthor.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${id}`);
    } else if(collaborators.includes({})
    }
    next();
}

module.exports.validateMovie = (req, res, next) => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



// module.exports.isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const movie = await Movie.findById(id);
//     if (!movie.movieAuthor.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/movies/${id}`);
//     }
//     next();
// }

module.exports.isMovieAuthor = async (req, res, next) => {
    const { id, movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie.movieAuthor.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${id}`);
    }
    next();
}

module.exports.isPersonalReviewAuthor = async (req, res, next) => {
    const { id, personalReviewId } = req.params;
    const personalReview = await PersonalReview.findById(personalReviewId);
    if (!personalReview.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/movies/${id}`);
    }
    next();
}

module.exports.validatePersonalReview = (req, res, next) => {
    const { error } = personalReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.testPrint = (req, res, next) => {
    console.log("req id from router: " + req.params.id)
}
