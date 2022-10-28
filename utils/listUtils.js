const sortUtils = require('./sortUtils');

module.exports.listFilterTypes = ['added by'];
module.exports.listSortTypes = ['title', 'date added', 'list author'];

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

module.exports.sortList = (listOfLists, sortType) => {
    let sortTerm;
    let sortedLists;
    switch (sortType) {
        case 'title':
            sortTerm = 'listTitle';
            sortedLists = sortUtils.sortAlpha(listOfLists, sortTerm);
            break;
        case 'date added':
            sortTerm = '';//////
            sortedLists = sortUtils.sortDate(listOfLists, sortTerm, 'listTitle');////
            break;
        case 'list author':
            sortTermOne = 'listAuthor';
            sortTermTwo = 'username';
            sortedLists = sortUtils.sortAlpha(listOfLists, sortTermOne, sortTermTwo);
            break;
        default:
            console.log('that sort will not work')
            break;
    }
    return sortedLists;
}

module.exports.getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;

}
