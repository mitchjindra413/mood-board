var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const debug = require('debug')

const cors = require('cors')
const { isProduction } = require('./config/keys')

const csurf = require('csurf')

//Models
require('./models/User')
require('./models/Post')
// require('./models/Comment')

//Passport
require('./config/passport')
const passport = require('passport')

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
const postsRouter = require('./routes/api/posts')
const csrfRouter = require('./routes/api/csrf')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

if (!isProduction){
    app.use(cors())
}

if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
        res.cookie('CSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('CSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

//Routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter)
app.use('/api/csrf', csrfRouter)

//Error handeling
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.statusCode = 404
    next(err)
})

const serverErrorLogger = debug('backend:error')

app.use((err, req, res, next) => {
    serverErrorLogger(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode)
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
})

module.exports = app;
