const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Movie = require('./models/movie');
//const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError.js');
const { movieSchema, personalReviewSchema } = require('./schemas.js');
const PersonalReview = require('./models/personalReview');

const movies = require('./routes/movies');
const personalReviews = require('./routes/personalReviews');

mongoose.connect('mongodb://localhost:27017/movie-inventory');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/movies', movies);
app.use('/movies/:id/personalReviews', personalReviews);

app.get('/', (req, res) => {
    res.render('home');
})

//make test movie to test database
/*
app.get('/makemovie', async (req,res) => {
    const movie = new Movie({title: 'Test Movie'});
    await movie.save();
    res.send(movie);
})
*/





app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 }= err;
    if(!err.message) err.message = "An error occured";
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
}) 