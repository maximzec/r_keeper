const express = require('express');
const app = express();
const port = process.env.port || 3000;

const restrauntRoutes = require('./api/restaraunts');

app.use('/restaraunts' , restrauntRoutes);



app.listen(port, () => {
    console.log('works');
});