const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileSchema = new Schema({
    link_name: {
        type: String,
        required : true
    },
    file_name: {
        type: String,
        required : true
    },
    file_url: {
        type: String,
        required : true
    },
    file_ext: {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('FileUpload', FileSchema);