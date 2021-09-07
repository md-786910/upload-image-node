const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const port = 3000
const hostname = "0.0.0.0"


app.use(express.urlencoded())
app.use(express.json())
// require db connection
require('./database/connections/db')

// reuire schema
const fileModel = require('./database/schema/schema')

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// set hbs path defaults
hbs.registerPartials(path.join(__dirname, "partials"))
app.set("view engine", "hbs")


// add image upload code using multer
const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, file.originalname)

    }
});

var upload = multer({ storage: storage })


app.get('/', async (req, res) => {
    try {
        const data = await fileModel.find()
        res.status(200).render("index", {
            fileImage: data
        })
    } catch (error) {
        console.log(error)
    }

})
app.get('/image', async (req, res) => {
    try {
        res.status(200).render("image")
    } catch (error) {
        console.log(error)
    }

})
app.post('/image', async (req, res) => {
    try {
        let searchVal = req.body.search
        let searchImage = await fileModel.find({ multiFiles: { $regex: searchVal, $options: '$i' } })
        res.status(200).render("image", {
            fileImage: searchImage
        })

    } catch (error) {
        console.log(error)
    }

})

app.post('/', upload.array('multiFiles'), async (req, res) => {
    try {
        let fileData = req.files
        fileData.forEach(async (img) => {
            let saveData = new fileModel({ multiFiles: img.originalname })
            let dataTodatabase = await saveData.save()

        })
        // console.log(fileData);
        res.redirect('/');

    } catch (error) {
        console.log(error)
    }
});


// delete image
app.post("/delete", async (req, res) => {
    try {
        let deletedId = req.body.delete

        let deletedItem = await fileModel.findByIdAndDelete({ _id: deletedId })

        res.redirect('/');
    } catch (error) {

    }
})
app.get('/image', (req, res) => {
    res.status(200).render("upload")
})

app.listen(port, hostname, () => {
    console.log("listening on port")
})