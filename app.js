const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Movie = require('./models/movie');
const catchAsync = require('./utils/catchAsync');
const expressError = require('./utils/ExpressError.js');
const ExpressError = require('./utils/ExpressError.js');
const { movieSchema } = require('./schemas.js');

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

const validateMovie = (req, res, next) => {
    const { error } = movieSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next();
    }
}

app.get('/movies', catchAsync(async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies });
}))

app.get('/movies/new', (req, res) => {
    res.render('movies/new');
})

app.post('/movies', validateMovie, catchAsync(async (req, res, next) => {
    //if(!req.body.movie) throw new ExpressError('Invalid Movie data', 400);
    const movie = new Movie(req.body.movie);
    await movie.save();
    res.redirect(`/movies/${movie._id}`)
}))

app.get('/movies/:id', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/show', { movie });
}))

app.get('/movies/:id/edit', catchAsync(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { movie });
}))

app.put('/movies/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`/movies/${movie._id}`)
}))

app.delete('/movies/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
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