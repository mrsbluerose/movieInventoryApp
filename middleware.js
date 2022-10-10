const { movieSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Movie = require('./models/movie');
const List = require('./models/list')
const listUtils = require('./utils/listUtils');
//const PersonalReview = require('./models/personalReview');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isListCollaborator = async (req, res, next) => {
    const { listId } = req.params;
    const list = await List.findById(listId);
    let isAuthor = listUtils.checkAuthor(list, req.user._id);
    let isCollaborator = listUtils.checkCollaborator(list, req.user._id);
    //const collaborators = list.listOfCollaborators;
    if (isAuthor || isCollaborator) {
        next();
    } else {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${listId}`);
    }
}

module.exports.isMovieAuthor = async (req, res, next) => {
    const { listId , movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie.movieAuthor.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${listId}`);
    }
    next();
}

module.exports.isListAuthor = async (req, res, next) => {
    const { listId  } = req.params;
    const list = await List.findById(listId);
    let isAuthor = listUtils.checkAuthor(list, req.user._id);
    if (!isAuthor) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${listId}`);
    }
    next();
}

// module.exports.validateMovie = (req, res, next) => {
//     const { error } = movieSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }



// module.exports.isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const movie = await Movie.findById(id);
//     if (!movie.movieAuthor.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/movies/${id}`);
//     }
//     next();
// }



// module.exports.isPersonalReviewAuthor = async (req, res, next) => {
//     const { id, personalReviewId } = req.params;
//     const personalReview = await PersonalReview.findById(personalReviewId);
//     if (!personalReview.author.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/movies/${id}`);
//     }
//     next();
// }

// module.exports.validatePersonalReview = (req, res, next) => {
//     const { error } = personalReviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }


