
//use .env for development
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');
const movieRoutes = require('./routes/movies');

mongoose.connect('mongodb://localhost:27017/movie-lists');
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
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    //store,
    //name: 'session', //changes default name to keep it more secure
    secret: "hello", //a 'secret' to sign cookies
    resave: false, //removes deprication warning
    saveUninitialized: true, //removes deprication warning
    cookie: {
        httpOnly: true, //security not to reveal cookies to third party
        //secure: true, //only over https in deployment
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), //expire in miliseconds * in minute * in hour * in day * in week = one week. Good to set. There is no default, and you don't want someone to stay logged in forever.
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/lists', listRoutes);
app.use('/lists/:listId/movies', movieRoutes); 


app.get('/', (req, res) => {
    res.render('home');
})

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