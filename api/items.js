const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({mergeParams: true});

const Item = require('../models/item');


router.get('/' , (req, res, next) => {

    Item.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        if(docs){
            const response = {
              count: docs.length,
              items: docs.map(doc => {
                  return {
                      name: doc.name,
                      price: doc.price,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: 'http://localhost:3000/restaraunts/10/items/' + doc.name
                      }
                  };
              })
            };
            res.status(200).json(response);
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

    const item = new Item({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    item.save()
    .then(result => {
            res.status(200).json({
            message: 'POST to /items',
            createdItem: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/restaraunts/10/items/' + doc.name
                }
            }
        });
    })
    .catch(err => console.log(err));
 
    
});

router.get('/:itemName', (req, res, next) => {
    const name = req.params.itemName;
    Item.findOne({name: name})
    .select('name price _id')
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