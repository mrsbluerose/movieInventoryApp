const User = require('../models/user');
const List = require('../models/list');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
        try { //use try catch to create better error message
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password); //set up to login after registering
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'Welcome to Movie Lists!');
                res.redirect('/lists');
            })
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('register');
        }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/lists';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = function(req, res, next) { //changed to get method and needs callback function (other way depricated)
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/lists');
    });
}

module.exports.addCollaborator = async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    const { userId } = req.body;
    const newCollaborator = await User.findById(userId);
    list.listOfCollaborators.push(newCollaborator);
    await list.save();

    req.flash('success', 'User added!');
    res.redirect(`/lists/${list._id}`);
}