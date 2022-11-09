//accepts a list, a property of that list, and a sub property 
//returns a list sorted alphabetically by the designated property
module.exports.sortAlpha = (listToBeSorted, sortTypeOne, sortTypeTwo = null) => {
    if (sortTypeTwo) {
        const sortedList = listToBeSorted.sort((a, b) => {
            if (a[sortTypeOne][sortTypeTwo].toUpperCase() < b[sortTypeOne][sortTypeTwo].toUpperCase()) {
                return -1;
            }
            if (a[sortTypeOne][sortTypeTwo].toUpperCase() > b[sortTypeOne][sortTypeTwo].toUpperCase()) {
                return 1;
            }
            return 0;

        });
        return sortedList;
    } else {
        const sortedList = listToBeSorted.sort((a, b) => {
            if (a[sortTypeOne].toUpperCase() < b[sortTypeOne].toUpperCase()) {
                return -1;
            }
            if (a[sortTypeOne].toUpperCase() > b[sortTypeOne].toUpperCase()) {
                return 1;
            }
            return 0;
        });
        return sortedList;
    }
}

//accepts a list and a property of that list
//returns a list sorted numerically by the designated property
module.exports.sortNum = (listToBeSorted, sortType, name) => {
    const sortedList = listToBeSorted.sort((a, b) => {
        return a[sortType] - b[sortType] || a[name].localeCompare(b[name])
    });
    return sortedList;
}

//accepts a list and a property of that list
//returns a list sorted numerically by the indicated date and then by title
module.exports.sortDate = (listToBeSorted, sortType, name) => {
    const sortedList = listToBeSorted.sort((a, b) => {
        return new Date(a[sortType]) - new Date(b[sortType]) || a[name].localeCompare(b[name])
    });
    return sortedList;
}