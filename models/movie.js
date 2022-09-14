const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalReview = require('./personalReview');

const MovieSchema = new Schema({
    movieTitle: String,
    movieDescription: String,
    movieAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieUrl: String,
    movieImgUrl: String
});

// const MovieSchema = new Schema({
//     movieTitle: String,
//     movieDescription: String,
//     movieAuthor: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }//,
//     // personalReviews: [
//     //     {
//     //         type: Schema.Types.ObjectId,
//     //         ref: 'PersonalReview'
//     //     }
//     // ]
// });

// MovieSchema.post('findOneAndDelete', async function (doc) {
//     if(doc){
//         await PersonalReview.deleteMany({
//             _id: {
//                 $in: doc.personalReviews
//             }
//         })
//     }
// })

module.exports = mongoose.model('Movie', MovieSchema);