const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const port = process.env.port || 3000;

const restrauntRoutes = require('./api/restaraunts');
const ordersRoutes = require('./api/orders');
const userRoutes = require('./api/users');
const itemRoutes = require('./api/items');


mongoose.connect(
    "mongodb+srv://Admin:27854565Aa@e-res.0s63v.mongodb.net/e-res?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/restaraunts' , restrauntRoutes);
app.use('/restaraunts/:restarauntID/orders', ordersRoutes);
app.use('/restaraunts/:restarauntID/users', userRoutes);
app.use('/restaraunts/:restarauntdID/items', itemRoutes);

app.use((req, res, next) => {
    const error = new Error('Invalid API response');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,

        }
    });
})

app.listen(port, () => {
    console.log('works');
});

module.exports = app;