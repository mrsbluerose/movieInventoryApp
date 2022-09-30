const { register } = require('../models/list');
const List = require('../models/list');
const User = require('../models/user');
const TMDB = require('../api/tmdbConfig');
//const Movie = require('../models/movie');

module.exports.index = async (req, res) => {
    const tmdb = new TMDB();
    const unsortedLists = await List.find({})
        .populate({
            path: 'listOfMovies',
            populate: {
                path: 'poster_path'
            }
        }).populate('listAuthor' );
    // const lists = unsortedLists.sort((a,b) => {
    //     if (a.listTitle < b.listTitle) {
    //         return -1;
    //     }
    //     if (a.listTitle > b.listTitle) {
    //         return 1;
    //     }
    //     return 0;
    // });
    res.render('lists/index', { unsortedLists, tmdb })
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

module.exports.showList = async (req, res,) => {
    const tmdb = new TMDB();
    const list = await List.findById(req.params.id).populate({ 
            path: 'listOfMovies',
            populate: {
                path: 'movieAuthor'
            }
        }).populate('listAuthor' );
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    res.render('lists/show', { list, tmdb });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id)
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    res.render('lists/edit', { list });
}

module.exports.updateList = async (req, res) => {
    const { id } = req.params;
    const list = await List.findByIdAndUpdate(id, { ...req.body.list });
    req.flash('success', 'Successfully updated list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.deleteList = async (req, res) => {
    const { id } = req.params;
    await List.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted list')
    res.redirect('/lists');
}