const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movie');

const ListSchema = new Schema({
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

module.exports = mongoose.model('List', ListSchema);