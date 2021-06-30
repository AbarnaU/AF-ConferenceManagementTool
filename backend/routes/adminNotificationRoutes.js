const express = require('express');
const router = express.Router();
const conferenceConformationSchema = require('../model/conferenceconformationModel')
const Controller = require('../controller/adminNotificationController');


router.route('/').post(function(req,res){
    let notification = new conferenceConformationSchema(req.body);
    notification.save()
        .then(result =>{
            res.status(200).json({'DB':"Conference Successfully Added",DATA:result})
        })
        .catch(err=>{
            res.status(400).json({'DB':"Insertion Unsuccessful"})
        })
});

router.get('/', function (req, res) {
    Controller.findAll().then((data) => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.get('/admin/:id', function (req, res) {
    Controller.findAdminNotifications(req.params.id).then((data) => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.put('/:id', function (req, res) {
    Controller.update(req.params.id, req.body).then((data) => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.delete('/:id', function (req, res) {
    Controller.delete(req.params.id).then((data) => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = router;
