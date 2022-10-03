const Movie = require('../models/movie');
const List = require('../models/list');
const TMDB = require('../api/tmdbConfig');
const axios = require('axios');
const user = require('../models/user');

// module.exports.index = async (req, res) => {
//     const unsortedMovies = await Movie.find({});
//     const movies = unsortedMovies.sort((a,b) => {
//         if (a.title < b.title) {
//             return -1;
//         }
//         if (a.title > b.title) {
//             return 1;
//         }
//         return 0;
//     });
//     res.render('movies/index', { movies })
// }

// module.exports.renderNewForm = (req, res) => {
//     res.render('movies/new');
// }

// module.exports.createMovie = async (req, res, next) => {
//     const movie = new Movie(req.body.movie);
//     movie.author = req.user._id;
//     await movie.save();
//     req.flash('success', 'Successfully made a new movie!');
//     res.redirect(`/movies/${movie._id}`)
// }

// module.exports.showMovie = async (req, res,) => {
//     const movie = await Movie.findById(req.params.id).populate({
//         path: 'personalReviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     if (!movie) {
//         req.flash('error', 'Cannot find that movie!');
//         return res.redirect('/movies');
//     }
//     res.render('movies/show', { movie });
// }

// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const movie = await Movie.findById(id)
//     if (!movie) {
//         req.flash('error', 'Cannot find that movie!');
//         return res.redirect('/movies');
//     }
//     res.render('movies/edit', { movie });
// }

// module.exports.updateMovie = async (req, res) => {
//     const { id } = req.params;
//     const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
//     req.flash('success', 'Successfully updated movie!');
//     res.redirect(`/movies/${movie._id}`)
// }

// module.exports.deleteMovie = async (req, res) => {
//     const { id } = req.params;
//     await Movie.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted movie')
//     res.redirect('/movies');
// }

module.exports.searchMovie = async (req, res) => {
    const tmdb = new TMDB();
    const searchTitle = req.body.searchTitle;
    const listId = req.params.id;
    const list = await List.findById(listId);
    const listTitle = list.listTitle;
    const searchTerm = searchTitle.replace(/ /g, '%');
    let url = `${tmdb.baseURL}/search/movie?api_key=${tmdb.api_key}&query=${searchTerm}&include_adult=false`;
    //let imageUrlBase = `${tmdb.images.base_url}/${tmdb.images.poster_sizes[1]}/`
    const movieSearch = await axios.get(url);
    const movieList = (movieSearch.data.results);
    res.render(`movies/search`, { movieList, listId, listTitle, searchTitle, tmdb });
}

module.exports.addMovie = async (req, res) => {
    const tmdb = new TMDB();
    const { id } = req.params;
    const list = await List.findById(id);
    const { movieId } = req.body;
    for (newMovieId of movieId) {
        let url = `${tmdb.baseURL}/movie/${newMovieId}?api_key=${tmdb.api_key}&language=en-US`
        const movieSearch = await axios.get(url);
        const newMovie = new Movie(movieSearch.data);
        newMovie.movieAuthor = req.user._id;
        list.listOfMovies.push(newMovie);
        await newMovie.save();
        await list.save();
    }
    req.flash('success', 'Movie added!');
    res.redirect(`/lists/${list._id}`);
}

// module.exports.addMovie = async (req, res) => {
//     const { id } = req.params;
//     const list = await List.findById(id);
//     const movie = new Movie(req.body.movie);
//     movie.movieAuthor = req.user._id;
//     list.listOfMovies.push(movie);
//     await movie.save();
//     await list.save();
//     req.flash('success', 'New review added!');
//     res.redirect(`/lists/${list._id}`);
// }

module.exports.deleteMovie = async (req, res) => {
    const { id, movieId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { listOfMovies: movieId } });
    await Movie.findByIdAndDelete(movieId);
    req.flash('success', 'Successfully deleted movie')
    res.redirect(`/lists/${id}`);
}