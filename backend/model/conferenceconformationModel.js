const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConferenceConformationSchema = new Schema({
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    },
    conference: {
        type: Schema.Types.ObjectId,
        ref: 'Conference'
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ConferenceConformation', ConferenceConformationSchema);