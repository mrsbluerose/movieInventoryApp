module.exports.setSortType = (sortType) => {
    switch (sortType) {
        case 'title':
            sortTerm = 'title';
            break;
        case 'date':
            sortTerm = 'release_date';
            break;
        case 'length':
            sortTerm = 'runtime'
            break;
        case 'added by':
            sortTerm = 'movie.movieAuthor.username';
            break;
        default:
            sortTerm = 'title';
            break;
    }

    return sortTerm;
}

module.exports.sortMovies = (listOfMovies, sortType) => {

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