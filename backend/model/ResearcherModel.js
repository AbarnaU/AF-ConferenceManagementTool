const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const ResearcherSchema = new Schema({
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
 
  gender: {
    type: String,
    require: true,
  },

  FileName: {
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
 

module.exports = mongoose.model('Researcher', ResearcherSchema)
