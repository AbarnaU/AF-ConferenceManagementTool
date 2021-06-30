const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Staff = require('../model/staffModel'); 

//Login as Staff
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Staff.findOne({email: email})
        .then(staff => {
            if (staff) {
                bcrypt.compare(password, staff.password)
                    .then(result => {
                        res.status(200).json({data:staff ,result:result});
                    }).catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

});

//Add new staff
router.route('/add').post(function (req, res) {
    let newStaff = new Staff(req.body);

    Staff.findOne({email: req.body.email})
        .then(user => {

            if (!user) {
                bcrypt.hash(newStaff.password, 10, (err, hash) => {
                    newStaff.password = hash;

                    newStaff.save().then(staff => {
                        res.status(200).json({data: staff});
                    })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({'Registration': 'failed'});
                        });
                })
            } else {
                res.status(409).json('User already exist');
            }
        })
        .catch(err => {
            console.log(err);
        })

});

//Retrive all staffs
router.route('/').get(function(req,res){
    Staff.find(function(err,staffs){
        if(err){
            console.log(err);
        }
        else {
            res.status(200).json(staffs);
        }
    })
})

//Retrive staff info for edit
router.route('/edit/:id').get(function (req, res) {

    Staff.findById(req.params.id,function(err, staff){
    if(err){
      console.log(err);
    }
    else {
        res.status(200).json(staff);
    }
  });
});

//Update the staff
router.route('/update/:id').post(function (req, res) {

    Staff.findById(req.params.id,function(err, staff){

        if(err){
            console.log(err);
        }
        else {

            staff.name=req.body.name;
            staff.email=req.body.email;
            staff.password=req.body.password;
            staff.role=req.body.role;
            staff.contact=req.body.contact;
            staff.address=req.body.address;
            
            staff.save()
                .then(result=>{
                    res.status(200).json({'Staff':"Successfully Updated"})
                })
                .catch(err=>{
                    res.status(400).send("Unable to Update Staff");
                })
            
        }
    });
});

//Remove the staff
router.route('/delete/:id').get(function(req,res){

    Staff.findByIdAndDelete(req.params.id,function(err,staff){

        if(err) 
            res.status(400).json(err);

        else 
            res.status(200).json('Successfully removed'+staff.name)
    })
})

module.exports = router;