const { register } = require('../models/list');
const List = require('../models/list');
const User = require('../models/user');
const TMDB = require('../api/tmdbConfig');
const listUtils = require('../utils/listUtils');
const movieUtils = require('../utils/movieUtils');
const genUtils = require('../utils/generalUtils');
//const Movie = require('../models/movie');

module.exports.index = async (req, res) => {
    const tmdb = new TMDB();
    const availableSortTypes = listUtils.listSortTypes;
    const availableFilterTypes = listUtils.listFilterTypes;
    let sortType;
    if (req.body.sortType) {
        sortType = req.body.sortType;
    } else {
        sortType = 'title';
    }

    const unsortedLists = await List.find({})
        .populate({
            path: 'listOfMovies',
            populate: {
                path: 'poster_path'
            }
        }).populate('listAuthor');

    const sortedLists = listUtils.sortList(unsortedLists, sortType);
    const authorOfLists = listUtils.filterAuthorLists(sortedLists, req.user._id);
    const collaboratorOfLists = listUtils.filterCollaboratorLists(sortedLists, req.user._id);
    const collaboratingLists = collaboratorOfLists[0];
    const allListAuthors = collaboratorOfLists[1];


    res.render('lists/index', { availableSortTypes, availableFilterTypes, authorOfLists, collaboratingLists, allListAuthors, tmdb })
}

module.exports.renderNewForm = (req, res) => {
    res.render('lists/new');
}

module.exports.createList = async (req, res, next) => {
    const list = new List(req.body.list);
    list.listAuthor = await User.findById(req.user._id);
    list.listCreatedDate = genUtils.getDate(),
    await list.save();
    req.flash('success', 'Successfully made a new list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.showList = async (req, res) => {
    const tmdb = new TMDB();
    const availableSortTypes = movieUtils.movieSortTypes;
    const availableFilterTypes = listUtils.listFilterTypes;
    let sortType;
    if (req.body.sortType) {
        sortType = req.body.sortType;
    } else {
        sortType = 'title';
    }
    const { listId } = req.params;
    const list = await List.findById(listId).populate({
        path: 'listOfMovies',
        //options: { sort: { 'title': -1 }}, //not working. need to reference key value in movie object in array of movies
        populate: {
            path: 'movieAuthor'
        }
    }).populate({
        path: 'listOfCollaborators',
        populate: {
            path: 'username'
        }
    }).populate('listAuthor');
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    const sortedListOfMovies = movieUtils.sortMovies(list.listOfMovies, sortType);
    list.listOfMovies = sortedListOfMovies;
    const users = await User.find({});
    let isAuthor = listUtils.checkAuthor(list, req.user._id);
    let isCollaborator = listUtils.checkCollaborator(list, req.user._id);
    res.render('lists/show', { list, tmdb, users, isAuthor, isCollaborator, availableSortTypes, availableFilterTypes });
}



module.exports.renderEditForm = async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId)
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    res.render('lists/edit', { list });
}

module.exports.updateList = async (req, res) => {
    const { listId } = req.params;
    const list = await List.findByIdAndUpdate(listId, { ...req.body.list });
    req.flash('success', 'Successfully updated list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.deleteList = async (req, res) => {
    const { listId } = req.params;
    await List.findByIdAndDelete(listId);
    req.flash('success', 'Successfully deleted list')
    res.redirect('/lists');
}


