const Movie = require('../models/movie');

module.exports.index = async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies })
}

module.exports.renderNewForm = (req, res) => {
    res.render('movies/new');
}

module.exports.createMovie = async (req, res, next) => {
    const movie = new Movie(req.body.movie);
    movie.author = req.user._id;
    await movie.save();
    req.flash('success', 'Successfully made a new movie!');
    res.redirect(`/movies/${movie._id}`)
}

module.exports.showMovie = async (req, res,) => {
    const movie = await Movie.findById(req.params.id).populate({
        path: 'personalReviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!movie) {
        req.flash('error', 'Cannot find that movie!');
        return res.redirect('/movies');
    }
    res.render('movies/show', { movie });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id)
    if (!movie) {
        req.flash('error', 'Cannot find that movie!');
        return res.redirect('/movies');
    }
    res.render('movies/edit', { movie });
}

module.exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    req.flash('success', 'Successfully updated movie!');
    res.redirect(`/movies/${movie._id}`)
}

module.exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted movie')
    res.redirect('/movies');
}