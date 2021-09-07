const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/imageUpload", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("connect")
}).catch(err => {
    console.log(err)
})


// module.exports = db