const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { port, connexionString } = require('./config');
const userRouters = require('./router/user.router.js');

const app = express();

mongoose.connect(connexionString);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/user', userRouters);
 
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${ port }/`);
});