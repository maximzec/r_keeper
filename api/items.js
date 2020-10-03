const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({mergeParams: true});

const Item = require('../models/item');


router.get('/' , (req, res, next) => {
    res.status(200).json({
        message: 'GET to /rests'
    });
});


router.post('/', (req, res, next) => {

    const item = new Item({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    item.save().then(result => console.log(result))
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'POST to /items',
        createdItem: item
    });
});

router.get('/:itemID', (req, res, next) => {
    /* #TODO:
        find out why if send itemID
        to mongo it returns some technical information
        not stored data 
    */
    const id = req.params.itemID;
    Item.findOne({_id:id})
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(400).json({
                message:'Nothing found in Atlas',
                hint: 'Check the ID property you sended'
            })
        }
            
    })
    .catch(err => {
        res.status(200).json(err);
    });
});

module.exports = router;