const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const indexRouter = require('./routes/index');

//load config
dotenv.config({ path: './config/config.env' });

//connect to database
const connectDB = require('./config/db');
connectDB();

//passport config
require('./config/passport')(passport);

const app = express();

//handlebars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'views');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//logging
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}


//routes
app.use('/auth', require('./routes/auth'));
app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));