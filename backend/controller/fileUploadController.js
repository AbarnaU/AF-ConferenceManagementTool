const FileSchema = require('../model/fileModel');

const fileUploadController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let fileUpload = new FileSchema(data);

            fileUpload.save().then((data) => {
                resolve({status: 200, message: 'File Added Successfully',data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            FileSchema.find().then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };
};

module.exports = new fileUploadController();