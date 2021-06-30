const express = require('express');
const router = express.Router();

const Conference = require('../model/conferenceModel');

router.route('/add').post(function(req,res){
    let conference = new Conference(req.body);
    conference.save()
        .then(result =>{
            res.status(200).json({'DB':"Conference Successfully Added",DATA:result})
        })
        .catch(err=>{
            res.status(400).json({'DB':"Insertion Unsuccessful"})
        })
});

router.route('/').get(function(req,res){
    Conference.find(function(err,conference){
        if(err){
            console.log(err);
        }
        else {
            res.status(200).json(conference);
        }
    })
})

router.route('/edit/:id').get(function (req, res) {

    Conference.findById(req.params.id,function(err, conference){
    if(err){
      console.log(err);
    }
    else {
        res.status(200).json(conference);
    }
  });
});

router.route('/update/:id').post(function (req, res) {

    Conference.findById(req.params.id,function(err, conference){

        if(err){
            console.log(err);
        }
        else {

            conference.name=req.body.name;
            conference.about=req.body.about;
            conference.startdate=req.body.startdate;
            conference.enddate=req.body.enddate;
            conference.venue=req.body.venue;
            conference.organizer=req.body.organizer;
            
            conference.save()
                .then(result=>{
                    res.status(200).json({'Conference':"Successfully Updated"})
                })
                .catch(err=>{
                    res.status(400).send("Unable to Update Conference");
                })          
        }
    });
});

router.route('/delete/:id').get(function(req,res){

    Conference.findByIdAndDelete(req.params.id,function(err,conference){

        if(err) 
            res.status(400).json(err);

        else 
            res.status(200).json('Successfully removed')
    })
})

module.exports=router;