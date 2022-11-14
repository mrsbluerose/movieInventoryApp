const Movie = require('../models/movie');
const List = require('../models/list');
const TMDB = require('../api/tmdbConfig');
const axios = require('axios');
const user = require('../models/user');
const genUtils = require('../utils/generalUtils');

module.exports.searchMovie = async (req, res) => {
    const tmdb = new TMDB();
    const searchTitle = req.body.searchTitle;
    const { listId } = req.params;
    const list = await List.findById(listId).populate('listOfMovies');
    //const listTitle = list.listTitle;
    const searchTerm = searchTitle.replace(/ /g, '%');
    let url = `${tmdb.baseURL}/search/movie?api_key=${tmdb.api_key}&query=${searchTerm}&include_adult=false`;
    const movieSearch = await axios.get(url);
    const movieList = (movieSearch.data.results);
    res.render(`movies/search`, { movieList, /*listId, listTitle,*/ list, searchTitle, tmdb }); //<%=listId%> <%= listTitle %>
}

module.exports.addMovie = async (req, res) => {
    const tmdb = new TMDB();
    const { listId } = req.params;
    const list = await List.findById(listId);
    const { movieId } = req.body;
    for (let newMovieId of movieId) {
        let url = `${tmdb.baseURL}/movie/${newMovieId}?api_key=${tmdb.api_key}&language=en-US`
        const movieSearch = await axios.get(url);
        const newMovie = new Movie(movieSearch.data);
        newMovie.movieAuthor = req.user._id;
        newMovie.movieAddedDate = genUtils.getDate();
        list.listOfMovies.push(newMovie);
        await newMovie.save();
        await list.save();
    }
    req.flash('success', 'Movie added!');
    res.redirect(`/lists/${list._id}`);
}

module.exports.deleteMovie = async (req, res) => {
    const { listId , movieId } = req.params;
    await List.findByIdAndUpdate( listId , { $pull: { listOfMovies: movieId } });
    await Movie.findByIdAndDelete(movieId);
    req.flash('success', 'Successfully deleted movie')
    res.redirect(`/lists/${ listId }`);
}



