const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Movie = require('./models/movie');

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

app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies });
})

app.get('/movies/new', (req, res) => {
    res.render('movies/new');
})

app.post('/movies', async (req, res, next) => {
    try {
        const movie = new Movie(req.body.movie);
        await movie.save();
        res.redirect(`/movies/${movie._id}`)
    } catch (e) {
        next(e);
    }
})

app.get('/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/show', { movie });
})

app.get('/movies/:id/edit', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { movie });
})

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`/movies/${movie._id}`)
})

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
})

app.use((err, req, res, next) => {
    res.send("error error");
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
}) 