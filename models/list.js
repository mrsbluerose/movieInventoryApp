const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movie');

const ListSchema = new Schema({
    listTitle: String,
    listDescription: String,
    listAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listOfMovies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

module.exports = mongoose.model('List', ListSchema);