const { register } = require('../models/list');
const List = require('../models/list');
const User = require('../models/user');
const TMDB = require('../api/tmdbConfig');
//const Movie = require('../models/movie');

module.exports.index = async (req, res) => {
    const tmdb = new TMDB();
    const authorOfLists = [];
    const collaboratorOfLists = [];

    const unsortedLists = await List.find({})
        .populate({
            path: 'listOfMovies',
            populate: {
                path: 'poster_path'
            }
        }).populate('listAuthor' );

    const sortedLists = unsortedLists.sort((a,b) => {
        if (a.listTitle < b.listTitle) {
            return -1;
        }
        if (a.listTitle > b.listTitle) {
            return 1;
        }
        return 0;
        
    });
    const username = req.user.username;
    for (list of sortedLists) {
        if(checkAuthor(list, username)){
            authorOfLists.push(list);
        }
        if (checkCollaborator(list, username)){
            collaboratorOfLists.push(list);
        }
    }
    
    res.render('lists/index', { authorOfLists, collaboratorOfLists, tmdb })
}

module.exports.renderNewForm = (req, res) => {
    res.render('lists/new');
}

module.exports.createList = async (req, res, next) => {
    const list = new List(req.body.list);
    list.listAuthor = req.user._id;
    await list.save();
    req.flash('success', 'Successfully made a new list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.showList = async (req, res) => {
    const tmdb = new TMDB();
    const { listId } = req.params;
    const list = await List.findById(listId).populate({ 
            path: 'listOfMovies',
            populate: {
                path: 'movieAuthor'
            }
        }).populate({ 
            path: 'listOfCollaborators',
            populate: {
                path: 'username'
            }
        }).populate('listAuthor' );
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    const users = await User.find({});
    let isCollaborator = checkCollaborator(list, req.user.username);
    let isAuthor = checkAuthor(list, req.user.username);
    // if(req.user){
    //     isCollaborator = list.listOfCollaborators.some(e => e.username === req.user.username);
    //     isAuthor = list.listAuthor.username === req.user.username;
    // }
    res.render('lists/show', { list, tmdb, users, isCollaborator, isAuthor });
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

function checkCollaborator(list, username) {
    if(list.listOfCollaborators.some(e => e.username === username)){
        return true;
    } else {
        return false;
    }
}

function checkAuthor(list, username){
    if(list.listAuthor.username === username){
        return true;
    } else {
        return false;
    }
}