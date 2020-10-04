const mongoose = require('mongoose');
const item = require('./item')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    items:[item],
    readyStatus:{
        type: Boolean,
        default: false
    },
    timeOrdered:{
        type:Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('Order' , orderSchema);