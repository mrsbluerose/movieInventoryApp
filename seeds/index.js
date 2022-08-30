//self contained file to run when necessary to seed files (rebuild, changes, etc.)

const mongoose = require('mongoose');
const Movie = require('../models/movie');
const PersonalReview = require('../models/personalReview');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/movie-inventory');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//The following function deletes the Movies, Personal Reviews and Users collections. It creates a new user and 5 movie documents with that user as the author, a title, a lorem ipsum description and no reviews. User email, username and password = 'seed'.
const seedDB = async () => {
    await Movie.deleteMany({});
    await PersonalReview.deleteMany({});
    await User.deleteMany({});
    const user = new User({ email: 'seed', username: 'seed' });
    const password = 'seed';
    await User.register(user, password);
    await Movie.insertMany(
        [
        {
            title: `Home Alone`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            author: user._id,
            personalReviews: []
        },
        {
            title: `Face Off`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            //author: '63090d061b0956e0e81b6667',
            author: user._id,
            personalReviews: []
        },
        {
            title: `Cold Comfort Farm`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            //author: '63090d061b0956e0e81b6667',
            author: user._id,
            personalReviews: []
        },
        {
            title: `Top Gun`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            //author: '63090d061b0956e0e81b6667',
            author: user._id,
            personalReviews: []
        },
        {
            title: `Galaxy Quest`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ut non accusantium unde magnam omnis reprehenderit animi enim quibusdam quam ipsum tempora neque nulla, id perferendis culpa itaque, quidem minus.',
            //author: '63090d061b0956e0e81b6667',
            author: user._id,
            personalReviews: []
        }

    ]
    )
  }

  //execute the seed function and close the database connection
seedDB().then(() => {
    mongoose.connection.close();
  });