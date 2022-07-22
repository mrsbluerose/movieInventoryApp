//self contained file to run when necessary to seed files (rebuild, changes, etc.)

const mongoose = require('mongoose');
const Movie = require('../models/movie');

mongoose.connect('mongodb://localhost:27017/movie-inventory');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Movie.deleteMany({});
    await Movie.insertMany(
        [
        {
            title: `Home Alone`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            personalReviews: []
        },
        {
            title: `Face Off`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            personalReviews: []
        },
        {
            title: `Cold Comfort Farm`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            personalReviews: []
        },
        {
            title: `Top Gun`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            personalReviews: []
        },
        {
            title: `Galaxy Quest`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            personalReviews: []
        }

    ]
    )
  }

  //execute the seed function and close the database connection
seedDB().then(() => {
    mongoose.connection.close();
  });