const conferenceConformationSchema = require('../model/conferenceconformationModel');

const adminAcceptPostController = function () {


this.findAceptedPost = () => {
    return new Promise((resolve, reject) => {
        conferenceConformationSchema.find().populate('conference').exec().then((data) => {
            resolve({status: 200, data: data});
        }).catch(err => {
            reject({status: 500, message: 'Error : ' + err});
        })
    })
};

}

module.exports = new adminAcceptPostController();