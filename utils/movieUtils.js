module.exports.availableMovieSortTypes = ['title', 'date', 'length', 'added by'];

module.exports.sortMovies = (listOfMovies, sortType) => {
    //console.log('this is the first length: ', listOfMovies[0].length);
    let sortTerm;
    let sortedMovies;
    switch (sortType) {
        case 'title':
            sortTerm = 'title';
            sortedMovies = sortMoviesAlpha(listOfMovies, sortTerm);
            break;
        case 'date':
            sortTerm = 'release_date';
            sortedMovies = sortMoviesNum(listOfMovies, sortTerm);
            break;
        case 'length':
            sortTerm = 'runtime'
            sortedMovies = sortMoviesNum(listOfMovies, sortTerm);
            break;
        case 'added by':
            sortTerm = 'movie.movieAuthor.username';
            sortedMovies = sortMoviesAlpha(listOfMovies, sortTerm);
            break;
        default:
            console.log('that sort will not work')
            break;
    }
    return sortedMovies;
}

sortMoviesAlpha = (listOfMovies, sortType) => {

    const sortedMovies = listOfMovies.sort((a, b) => {
        if (a[sortType].toUpperCase() < b[sortType].toUpperCase()) {
            return -1;
        }
        if (a[sortType].toUpperCase() > b[sortType].toUpperCase()) {
            return 1;
        }
        return 0;

    });

    return sortedMovies;
}

sortMoviesNum = (listOfMovies, sortType) => {
    console.log('this is the sort: ', sortType)
    const sortedMovies = listOfMovies.sort((a, b) => { 
        console.log(a[parseInt(sortType)]);
        console.log(b[parseInt(sortType)]);
        return a[parseInt(sortType)] - b[parseInt(sortType)] });
        return sortedMovies;
}