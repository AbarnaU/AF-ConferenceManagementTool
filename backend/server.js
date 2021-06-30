const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileupload=require('express-fileupload')
const db = require('./connection/db')

const app = express()
app.use(cors())
app.use(fileupload())

app.use(bodyParser.json())
app.use(express.static('public'))

mongoose
  .connect(db.mongodbUrl, db.options)
  .then(() => {
    console.log('Connected to the DB Successfully')
  })
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })

app.use('/staffs', require('./routes/staffRoutes'))
app.use('/editor/conference', require('./routes/editorConferenceRoutes'))
app.use('/admin/notifications', require('./routes/adminNotificationRoutes'))
app.use('/post', require('./routes/adminAcceptPostRoutes'))
app.use('/user/conference', require('./routes/userViewPostRouter'))
app.use('/attendees', require('./routes/AttendeeRoutes'))
app.use('/researchers', require('./routes/ResearcherRoutes'))


app.listen(4000, function () {
  console.log('Server is running on Port: ' + 4000)
})
