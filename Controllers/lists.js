const { register } = require('../models/list');
const List = require('../models/list');

module.exports.index = async (req, res) => {
    const unsortedLists = await List.find({});
    const lists = unsortedLists.sort((a,b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    res.render('lists/index', { lists })
}

module.exports.renderNewForm = (req, res) => {
    res.render('lists/new');
}

module.exports.createList = async (req, res, next) => {
    const list = new List(req.body.list);
    list.author = req.user._id;
    await list.save();
    req.flash('success', 'Successfully made a new list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.showList = async (req, res,) => {
    const list = await List.findById(req.params.id).populate({ path:'movies' }).populate('author');
    console.log(list);
    if (!list) {
        req.flash('error', 'Cannot find that list!');
        return res.redirect('/lists');
    }
    if(list.movies.length === 0 ) {
        req.flash('error', 'No movies to show!');
        return res.redirect('/lists');
    }
    res.render('lists/show', { list });
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
    const movie = await List.findByIdAndUpdate(id, { ...req.body.list });
    req.flash('success', 'Successfully updated list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.deleteList = async (req, res) => {
    const { id } = req.params;
    await List.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted list')
    res.redirect('/lists');
}