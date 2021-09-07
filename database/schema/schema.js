const mongoose = require('mongoose')
const multiFileSchema = new mongoose.Schema({
    multiFiles: String
})

const fileModel = new mongoose.model("fileModel", multiFileSchema)

module.exports = fileModel