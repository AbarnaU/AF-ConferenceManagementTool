const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Researcher = require('../model/ResearcherModel')

//test


// add researcher
router.route('/addResearcher').post(function (req, res) {
  var files = req.files.file

  files.mv('public/files/'+ files.name, function (err) {
    if (!err) {
      console.log("File Saved")

    } else {
      console.log(err)

    }
  })
  Researcher.findOne({ email: req.body.email })
    .then((Researcherres) => {
      if (!Researcherres) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          let Researcherpassword = new Researcher(req.body)
          Researcherpassword.password = hash
          Researcherpassword.save()
            .then((researcher) => {
              res.status(200).json({ data: researcher })
            })
            .catch((err) => {
              console.log(err)
              res.status(400).json({ Registration: 'failed' })
            })
        })
      } else {
        res.status(409).json('Researcher already exist')
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
//get Researcher
router.route('/display/:id').get(function (req, res) {
  Researcher.findById(req.params.id, function (err, researcher) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(researcher)
    }
  })
})

//login as Researcher

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  Researcher.findOne({ email: email })
    .then((researcher) => {
      if (researcher) {
        bcrypt
          .compare(password, researcher.password)
          .then((result) => {
            res.status(200).json({ data: researcher, result: result })
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

// remove Researcher
router.route('/delete/:id').get(function (req, res) {
Researcher.findByIdAndDelete(req.params.id, function (err, researcher) {
    if (err) res.status(400).json(err)
    else res.status(200).json('Successfully removed' + researcher.name)
  })
})

//Retrive researcher info for edit
router.route('/edit/:id').get(function (req, res) {
Researcher.findById(req.params.id, function (err, researcher) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(researcher)
    }
  })
})

//Update Researcher
router.route('/update/:id').post(function (req, res) {
    Researcher.findById(req.params.id, function (err, researcher) {
    if (err) {
      console.log(err)
    } else {
      researcher.name = req.body.name
      researcher.email = req.body.email
      researcher.password = req.body.password
      researcher.gender = req.body.gender
      researcher.file = req.body.file
      researcher.Card_Number = req.body.Card_Number
      researcher.Cvv = req.body.Cvv
      researcher.ExpireDate = req.body.ExpireDate
      

      researcher
        .save()
        .then((result) => {
          res.status(200).json({ user : 'Successfully Updated' })
        })
        .catch((err) => {
          res.status(400).send('Unable to Update researcher')
        })
    }
  })
})

module.exports = router