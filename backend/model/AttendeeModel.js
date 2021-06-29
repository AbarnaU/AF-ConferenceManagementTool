const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const AttendeeSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  password: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  Gender: {
    type: String,
    require: true,
  },
  Card_Number: {
    type: String,
    require: true,
  },
  Cvv: {
    type: String,
    require: true,
  },
  ExpireDate: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Attendee', AttendeeSchema)
