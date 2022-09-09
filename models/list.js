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

//removes all movies associated with a list being deleted
ListSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Movie.deleteMany({
            _id: {
                $in: doc.listOfMovies
            }
        })
    }
})

module.exports = mongoose.model('List', ListSchema);