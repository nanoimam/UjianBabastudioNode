const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const cors =require("cors")

mongoose.connect('mongodb://localhost/UjianNode')
.then(db => console.log('db_connected'))
.catch(err => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
let corsOptions = {
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["Content-Type", "tokenshop"]
}
app.use(cors(corsOptions))
require('./router/router')(app)
const PORT = process.env.PORT || 8000

app.listen(PORT,() => {
    console.log('Berhasil menjalankan server pada port 8000')
})