const express = require('express');
const dotenv = require('dotenv');
const {engine} = require('express-handlebars');
const morgan = require('morgan');
const indexRouter = require('./routes/index');

//load config
dotenv.config({ path: './config/config.env' });

//connect to database
const connectDB = require('./config/db');
connectDB();

const app = express();

//handlebars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'views');

//static folder
app.use(express.static('public'));

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//logging
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}


//routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));