const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConferenceSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    organizer:{
        type:String,
        required:true,
    },
    staffs :[{
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    }]
});

module.exports = mongoose.model('Conference', ConferenceSchema);