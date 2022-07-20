const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalReviewSchema = new Schema({
    body: String,
    rating: Number
})

mongoose.model.exports = mongoose.model("PersonalReview", personalReviewSchema);