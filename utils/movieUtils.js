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
            sortedMovies = sortMoviesDate(listOfMovies, sortTerm);
            break;
        case 'length':
            sortTerm = 'runtime'
            sortedMovies = sortMoviesNum(listOfMovies, sortTerm);
            break;
        case 'added by':
            sortTermOne = 'movieAuthor';
            sortTermTwo = 'username';
            sortedMovies = sortMoviesAlpha(listOfMovies, sortTermOne, sortTermTwo);
            break;
        default:
            console.log('that sort will not work')
            break;
    }
    return sortedMovies;
}

sortMoviesAlpha = (listOfMovies, sortTypeOne, sortTypeTwo = null) => {
    if (sortTypeTwo) {
        const sortedMovies = listOfMovies.sort((a, b) => {
            if (a[sortTypeOne][sortTypeTwo].toUpperCase() < b[sortTypeOne][sortTypeTwo].toUpperCase()) {
                return -1;
            }
            if (a[sortTypeOne][sortTypeTwo].toUpperCase() > b[sortTypeOne][sortTypeTwo].toUpperCase()) {
                return 1;
            }
            return 0;

        });
        return sortedMovies;
    } else {
        const sortedMovies = listOfMovies.sort((a, b) => {
            if (a[sortTypeOne].toUpperCase() < b[sortTypeOne].toUpperCase()) {
                return -1;
            }
            if (a[sortTypeOne].toUpperCase() > b[sortTypeOne].toUpperCase()) {
                return 1;
            }
            return 0;
        });
        return sortedMovies;
    }
}

sortMoviesNum = (listOfMovies, sortType) => {
    const sortedMovies = listOfMovies.sort((a, b) => {
        return a[sortType] - b[sortType]
    });
    return sortedMovies;
}

sortMoviesDate = (listOfMovies, sortType) => {
    const sortedMovies = listOfMovies.sort((a, b) => {
        return new Date(a[sortType]) - new Date(b[sortType])
    });
    return sortedMovies;
}