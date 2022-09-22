const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const PersonalReview = require('./personalReview');

const MovieSchema = new Schema({
        //adult: Boolean,
        //backdrop_path: String,
        //belongs_to_collection: Object,
        //budget: Number,
        genres: [
          {
            id: Number,
            name: String
          }
        ],
        homepage: String,
        id: Number,
        //imdb_id: String,
        //original_language: String,
        //original_title: String,
        overview: String,
        //popularity: Number,
        poster_path: String,
        // production_companies: [
        //   {
        //     name: String,
        //     id: Number,
        //     logo_path: String,
        //     origin_country: String
        //   }
        // ],
        // production_countries: [
        //   {
        //     iso_3166_1: String,
        //     name: String
        //   }
        // ],
        release_date: String,
        //revenue: Number,
        runtime: Number,
        // spoken_languages: [
        //   {
        //     iso_639_1: String,
        //     name: String
        //   }
        // ],
        //status: String,
        //tagline: String,
        title: String
        //video: Boolean,
        //vote_average: Number,
        //vote_count: Number
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
//module.exports = mongoose.model('MovieTwo', MovieSchemaTwo);