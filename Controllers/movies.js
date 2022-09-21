const Movie = require('../models/movie');
const List = require('../models/list');
const TMDB = require('../api/tmdb');
const axios = require('axios');

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

module.exports.searchMovie = async (req,res) => {
    const title = req.body.title;
    const searchTerm = title.replace(/ /g, '%');
    let url = `https://api.themoviedb.org/3/search/movie?api_key=36b5ba263fac78da8136e35b4b966263&query=${searchTerm}&include_adult=false`;
    const movie = await axios.get(url);
    //console.log(movie.data.results[0].title);
    const movieList = (movie.data.results);
    console.log(movieList);
    res.redirect(`/lists/`);
}

module.exports.addMovie = async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    const movie = new Movie(req.body.movie);
    movie.movieAuthor = req.user._id;
    list.listOfMovies.push(movie);
    await movie.save();
    await list.save();
    req.flash('success', 'New review added!');
    res.redirect(`/lists/${list._id}`);
}

module.exports.deleteMovie = async (req, res) => {
    const { id, movieId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { movieList: movieId } });
    await Movie.findByIdAndDelete(movieId);
    req.flash('success', 'Successfully deleted movie')
    res.redirect(`/lists/${id}`);
}