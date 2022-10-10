module.exports.checkAuthor = (list, id) => {
    return list.listAuthor._id.valueOf() === id.valueOf();
}

module.exports.checkCollaborator = (list, id) => {
    return list.listOfCollaborators.some(e => e._id.valueOf() === id.valueOf());
}

module.exports.filterAuthorLists = (lists, id) => {
    let authorOfLists = [];
    for (list of lists) {
        if (this.checkAuthor(list, id)) {
            authorOfLists.push(list);
        }
    }
    return authorOfLists;
}

module.exports.filterCollaboratorLists = (lists, id) => {
    let collaboratorOfLists = [];
    for (list of lists) {
        if (this.checkCollaborator(list, id)) {
            collaboratorOfLists.push(list);
        }
    }
    return collaboratorOfLists;
}

module.exports.setSortType = (sortType) => {
    
    let sortTerm = '';
    switch (sortType) {
        case 'title':
            sortTerm = 'listTitle';
            break;
        case 'author':
            sortTerm = 'list.listAuthor.username';
            break;
        default:
            sortTerm = 'listTitle';
            break;
    }
    
    return sortTerm;
}

//need to figure out how to sort by dates and not just alphabetize. to uppercase wouldn't make sense.
module.exports.sortList = (unsortedLists, sortType) => {

    const sortedLists = unsortedLists.sort((a, b) => {
        if (a[sortType].toUpperCase() < b[sortType].toUpperCase()) {
            return -1;
        }
        if (a[sortType].toUpperCase() > b[sortType].toUpperCase()) {
            return 1;
        }
        return 0;

    });

    return sortedLists;
}
