const List = require('../models/list');

module.exports.index = async (req, res) => {
    const lists = await List.find({});
    res.render('list/index', { lists })
}

module.exports.renderNewForm = (req, res) => {
    res.render('lists/new');
}

module.exports.createList = async (req, res, next) => {
    const list = new List(req.body.movie);
    list.author = req.user._id;
    await list.save();
    req.flash('success', 'Successfully made a new list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.showList = async (req, res,) => {
    const list = await List.findById(req.params.id).populate({
        path: 'movies',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!list) {
        req.flash('error', 'Cannot find that list!');
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
    const movie = await List.findByIdAndUpdate(id, { ...req.body.movie });
    req.flash('success', 'Successfully updated list!');
    res.redirect(`/lists/${list._id}`)
}

module.exports.deleteList = async (req, res) => {
    const { id } = req.params;
    await List.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted list')
    res.redirect('/lists');
}