const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Movie = require('./models/movie');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError.js');
const { movieSchema, personalReviewSchema } = require('./schemas.js');
const PersonalReview = require('./models/personalReview');

const movies = require('./routes/movies');

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

app.use('/movies/', movies);

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



const validatePersonalReview = (req, res, next) => {
    const { error } = personalReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



app.post('/movies/:id/personalReviews', validatePersonalReview, catchAsync(async (req,res) => {
    const movie = await Movie.findById(req.params.id);
    const personalReview = new PersonalReview(req.body.personalReview);
    movie.personalReviews.push(personalReview);
    await personalReview.save();
    await movie.save();
    res.redirect(`/movies/${movie._id}`);
}))

app.delete('/movies/:id/personalReviews/:personalReviewId', catchAsync(async (req, res) => {
    const { id, personalReviewId } = req.params;
    await Movie.findByIdAndUpdate(id, { $pull: { personalReviews: personalReviewId } });
    await PersonalReview.findByIdAndDelete(personalReviewId);
    res.redirect(`/movies/${id}`);
}))

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