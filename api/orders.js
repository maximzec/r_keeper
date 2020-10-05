const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const order = require('../models/order');
const Order = require('../models/order');

router.get('/' , (req, res, next) => {
    Order.find()
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(400).json({
                message:'Nothing found in Atlas',
                hint: 'DB is empty'
            })
        }
            
    })
    .catch(err => {
        res.status(200).json(err);
    });
});


router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        items: req.body.items
    });

    order.save()
    .then(result => {
        res.status(200).json({
        message: 'POST to /orders',
        createdOrder: order
    });
    })
    .catch(err => console.log(err));
    
});

router.post('/:orderID/ready', (req, res, next) => {
    const orderID = req.params.orderID;
    Order.updateOne({_id: orderID},{
        $set:{'readyStatus':true}
    })
    .exec()
    .then(doc => res.status(200).json({
        message: 'Succefuly updated status'
    }))
    .catch(err => res.status(400).json({error: err}))
});

router.get('/:orderID', (req, res, next) => {
    const id = req.params.restID;
    if (id === 'special') {
        res.status(200).json({
            message: 'special id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'SUCCEFULY PASSED ID12',
            id: id
        });
    }
});


module.exports = router;