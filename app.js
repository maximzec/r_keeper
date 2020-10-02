const express = require('express');
const app = express();
const morgan = require('morgan');

const port = process.env.port || 3000;

const restrauntRoutes = require('./api/restaraunts');
const ordersRoutes = require('./api/orders');
const userRoutes = require('./api/users');
const itemRoutes = require('./api/item');

app.use(morgan('dev'));


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