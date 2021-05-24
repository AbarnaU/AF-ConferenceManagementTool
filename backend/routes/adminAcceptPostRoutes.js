const express = require('express');
const router = express.Router();
const Controller = require('../controller/adminAcceptPostController');

router.get('/all', function (req, res) {
    Controller.findAceptedPost().then((data) => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = router;