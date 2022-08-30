const Movie = require('../models/movie');
const PersonalReview = require('../models/personalReview');

module.exports.createPersonalReview = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    const personalReview = new PersonalReview(req.body.personalReview);
    personalReview.author = req.user._id;
    movie.personalReviews.push(personalReview);
    await personalReview.save();
    await movie.save();
    req.flash('success', 'New review created!');
    res.redirect(`/movies/${movie._id}`);
}

module.exports.deletePersonalReview = async (req, res) => {
    const { id, personalReviewId } = req.params;
    await Movie.findByIdAndUpdate(id, { $pull: { personalReviews: personalReviewId } });
    await PersonalReview.findByIdAndDelete(personalReviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/movies/${id}`);
}