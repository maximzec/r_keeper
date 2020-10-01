const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/' , (req, res, next) => {
    res.status(200).json({
        message: 'GET to /rests'
    });
});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST to /rests'
    });
});

router.get('/:itemID', (req, res, next) => {
    const id = req.params.restID;
    if (id === 'special') {
        res.status(200).json({
            message: 'special user id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'SUCCEFULY PASSED USER_ID',
            id: id
        });
    }
});

module.exports = router;