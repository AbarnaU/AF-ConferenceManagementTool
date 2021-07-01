const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const WorkshopConductor = require('../model/workshopConductor')

// Store WorkshopConductor
router.route('/add').post(function (req, res) {
    WorkshopConductor.findOne({ email: req.body.email })
    .then((WorkshopConductorres) => {
      if (!WorkshopConductorres) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          let WorkshopConductorpassword = new WorkshopConductor(req.body)
          WorkshopConductorpassword.password = hash
          WorkshopConductorpassword.save()
            .then((workshopConductor) => {
              res.status(200).json({ data: workshopConductor })
            })
            .catch((err) => {
              console.log(err)
              res.status(400).json({ Registration: 'failed' })
            })
        })
      } else {
        res.status(409).json('WorkshopConductor is already exist')
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//get WorkshopConductor
router.route('/display/:id').get(function (req, res) {
    WorkshopConductor.findById(req.params.id, function (err, workshopConductor) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(workshopConductor)
    }
  })
})

//login as workshopConductor

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  WorkshopConductor.findOne({ email: email })
    .then((workshopConductor) => {
      if (workshopConductor) {
        bcrypt
          .compare(password, workshopConductor.password)
          .then((result) => {
            res.status(200).json({ data: workshopConductor, result: result })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

// remove workshopConductor
router.route('/delete/:id').get(function (req, res) {
    WorkshopConductor.findByIdAndDelete(req.params.id, function (err, workshopConductor) {
    if (err) res.status(400).json(err)
    else res.status(200).json('Successfully removed' + workshopConductor.name)
  })
})

//Retrive workshopConductor info for edit
router.route('/edit/:id').get(function (req, res) {
    WorkshopConductor.findById(req.params.id, function (err, workshopConductor) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(workshopConductor)
    }
  })
})

//Update workshopConductor
router.route('/update/:id').post(function (req, res) {
    WorkshopConductor.findById(req.params.id, function (err, workshopConductor) {
    if (err) {
      console.log(err)
    } else {
      workshopConductor.name = req.body.name
      workshopConductor.email = req.body.email
      workshopConductor.password = req.body.password
      workshopConductor.address = req.body.address
      workshopConductor.contact = req.body.contact
      workshopConductor.Gender = req.body.Gender
      
      workshopConductor
        .save()
        .then((result) => {
          res.status(200).json({ Staff: 'Successfully Updated' })
        })
        .catch((err) => {
          res.status(400).send('Unable to Update')
        })
    }
  })
})

module.exports = router
