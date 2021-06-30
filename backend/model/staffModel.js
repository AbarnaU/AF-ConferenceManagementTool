const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true, 
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    conference :[{
        type: Schema.Types.ObjectId,
        ref: 'Conference'
    }]
});

module.exports = mongoose.model('Staff',StaffSchema);