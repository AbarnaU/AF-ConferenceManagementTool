const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Attendee = require('../model/AttendeeModel')

// Store Attendee
router.route('/addAttendee').post(function (req, res) {
  Attendee.findOne({ email: req.body.email })
    .then((Attendeeres) => {
      if (!Attendeeres) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          let Attendeepassword = new Attendee(req.body)
          Attendeepassword.password = hash
          Attendeepassword.save()
            .then((attendee) => {
              res.status(200).json({ data: attendee })
            })
            .catch((err) => {
              console.log(err)
              res.status(400).json({ Registration: 'failed' })
            })
        })
      } else {
        res.status(409).json('Attendee already exist')
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//get Attendee
router.route('/display/:id').get(function (req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(attendee)
    }
  })
})

//login as attendee

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  Attendee.findOne({ email: email })
    .then((attendee) => {
      if (attendee) {
        bcrypt
          .compare(password, attendee.password)
          .then((result) => {
            res.status(200).json({ data: attendee, result: result })
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

// remove attendee
router.route('/delete/:id').get(function (req, res) {
  Attendee.findByIdAndDelete(req.params.id, function (err, attendee) {
    if (err) res.status(400).json(err)
    else res.status(200).json('Successfully removed' + attendee.name)
  })
})

//Retrive attendee info for edit
router.route('/edit/:id').get(function (req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(attendee)
    }
  })
})

//Update attendee
router.route('/update/:id').post(function (req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if (err) {
      console.log(err)
    } else {
      attendee.name = req.body.name
      attendee.email = req.body.email
      attendee.password = req.body.password
      attendee.address = req.body.address
      attendee.contact = req.body.contact
      attendee.Gender = req.body.Gender
      attendee.Card_Number = req.body.Card_Number
      attendee.Cvv = req.body.Cvv
      attendee.ExpireDate = req.body.ExpireDate

      attendee
        .save()
        .then((result) => {
          res.status(200).json({ Staff: 'Successfully Updated' })
        })
        .catch((err) => {
          res.status(400).send('Unable to Update Attendee')
        })
    }
  })
})

module.exports = router
