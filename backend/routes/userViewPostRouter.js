const express = require('express');
const router = express.Router();

const Conference = require('../model/conferenceModel');

router.route('/view/:name').get(function (req, res) {

    Conference.findOne({name:req.params.name},function(err, conference){
    if(err){
      console.log(err);
    }
    else {
        res.status(200).json(conference);
    }
  });
});

module.exports=router;