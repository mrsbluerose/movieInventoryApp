const sortUtils = require('./sortUtils');

module.exports.movieSortTypes = ['title', 'release date', 'length', 'date added'];
module.exports.movieFilterTypes = ['added by'];

module.exports.filterMoviesByAuthor = (list, userId) => {
    console.log('from movie utils filter movies by author');
        let movieList = [];
        for (let movie of list) {
            if (movie.movieAuthor.id === userId) {
                console.log('from movie utils filter movies by author of ids are equal');
                movieList.push(movie);
            }
        }
        return [movieList];
    }

module.exports.sortMovies = (listOfMovies, sortType) => {
    let sortTerm;
    let sortedMovies;
    switch (sortType) {
        case 'title':
            sortTerm = 'title';
            sortedMovies = sortUtils.sortAlpha(listOfMovies, sortTerm);
            break;
        case 'release date':
            sortTerm = 'release_date';
            sortedMovies = sortUtils.sortDate(listOfMovies, sortTerm, 'title');
            break;
        case 'length':
            sortTerm = 'runtime'
            sortedMovies = sortUtils.sortNum(listOfMovies, sortTerm, 'title');
            break;
        case 'date added':
            sortTerm = 'movieAddedDate';
            sortedMovies = sortUtils.sortDate(listOfMovies, sortTerm, 'title');
            break;
        default:
            console.log('that sort will not work')
            break;
    }
    return sortedMovies;
}

// sortMoviesAlpha = (listOfMovies, sortTypeOne, sortTypeTwo = null) => {
//     if (sortTypeTwo) {
//         const sortedMovies = listOfMovies.sort((a, b) => {
//             if (a[sortTypeOne][sortTypeTwo].toUpperCase() < b[sortTypeOne][sortTypeTwo].toUpperCase()) {
//                 return -1;
//             }
//             if (a[sortTypeOne][sortTypeTwo].toUpperCase() > b[sortTypeOne][sortTypeTwo].toUpperCase()) {
//                 return 1;
//             }
//             return 0;

//         });
//         return sortedMovies;
//     } else {
//         const sortedMovies = listOfMovies.sort((a, b) => {
//             if (a[sortTypeOne].toUpperCase() < b[sortTypeOne].toUpperCase()) {
//                 return -1;
//             }
//             if (a[sortTypeOne].toUpperCase() > b[sortTypeOne].toUpperCase()) {
//                 return 1;
//             }
//             return 0;
//         });
//         return sortedMovies;
//     }
// }

// sortMoviesNum = (listOfMovies, sortType) => {
//     const sortedMovies = listOfMovies.sort((a, b) => {
//         return a[sortType] - b[sortType]
//     });
//     return sortedMovies;
// }

// sortMoviesDate = (listOfMovies, sortType) => {
//     const sortedMovies = listOfMovies.sort((a, b) => {
//         return new Date(a[sortType]) - new Date(b[sortType])
//     });
//     return sortedMovies;
// }