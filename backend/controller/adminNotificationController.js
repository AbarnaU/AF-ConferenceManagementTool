const conferenceConformationSchema = require('../model/conferenceconformationModel');

const adminNotificationController = function () {

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            conferenceConformationSchema.find().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAdminNotifications = (id) => {
        return new Promise((resolve, reject) => {
            conferenceConformationSchema.find({staff: id}).populate('conference').exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (id,data) => {
        return new Promise((resolve, reject) => {
            conferenceConformationSchema.updateOne({_id:id},data).then(() => {
                resolve({status: 200, message: 'Notification Updated Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            conferenceConformationSchema.deleteOne({_id: id}).then(() => {
                resolve({status: 200, message: 'Notification Deleted Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

};

module.exports = new adminNotificationController();