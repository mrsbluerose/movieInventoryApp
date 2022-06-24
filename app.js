const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require('./models/movie');

mongoose.connect('mongodb://localhost:27017/movie-inventory');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
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

//test that the site is working

app.get('/', (req, res) => {
    res.send('Testing');
})


app.listen(3000, () => {
    console.log('Serving on port 3000');
}) 