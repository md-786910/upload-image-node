const mongoose = require('mongoose')

//mongodb+srv://db:6O3rHBpJYYLnGjbV@database.l2fnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// ', { useNewUrlParser: true, useUnifiedTopology: true });

// mongodb://localhost:27017/imageUpload

mongoose.connect("mongodb+srv://db:6O3rHBpJYYLnGjbV@database.l2fnk.mongodb.net/imageUpload?retryWrites=true&w=majority", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,

}).then(() => {
    console.log("connect")
}).catch(err => {
    console.log(err)
})

