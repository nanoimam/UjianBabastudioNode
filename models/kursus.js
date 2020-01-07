var mongoose = require('mongoose')

var ProductSchema = mongoose.Schema({
    nama_kursus: {
        type: String,
        required: true
    },
    total_durasi: {
        type: String,
        required: true
    },
    total_murid: {
        type: String,
        required: true
    },
    jumlah_video: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    diskon: {
        type: Number
    },
},
{
        timestamps: true
})
var Product = module.exports = mongoose.model('kursus',ProductSchema)