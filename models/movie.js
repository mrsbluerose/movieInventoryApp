const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    description: String,
    personalRating: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PersonalReview'
        }
    ]
})

module.exports = mongoose.model('Movie', MovieSchema);