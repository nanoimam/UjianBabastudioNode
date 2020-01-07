const Product = require('../models/kursus')

exports.home = (req,res) => {
    res.send("Welcome to API shop")
}

exports.listProduct = async (req,res) => {
    let data = await Product.find()
    res.send(JSON.stringify({"status" : 200, "error" : null, "response" : data}))
}

exports.detailProduct = async (req,res) => {
    const data = await Product.findById(req,params.id)
    res.send(JSON.stringify({"status": 200, "error" : null, "response" : data}))
}

exports.tambahProduct = async (req,res) => {
    const harga = Number.parseInt(req.body.harga)
    const total_durasi = Number.parseInt(req.body.total_durasi)
    const total_murid = Number.parseInt(req.body.total_murid)
    const jumlah_video = Number.parseInt(req.body.jumlah_video)
    const img = req.body.img
    const nama_kursus = req.body.nama_kursus
    if(harga >= 5000000){
        const data = {
            total_durasi : total_durasi,
            total_murid : total_murid,
            jumlah_video : jumlah_video,
            img : img,
            nama_kursus : nama_kursus,
            harga : harga,
            diskon : harga - (((20/100) * harga) - 100000)
        }
        const carts = new Product(data)
        const status = await carts.save()
        res.send(JSON.stringify({"status" : 200, "error": null, "response" : status}))
    }else{
        const data = {
            total_durasi : total_durasi,
            total_murid : total_murid,
            jumlah_video : jumlah_video,
            img : img,
            nama_kursus : nama_kursus,
            harga : harga,
            diskon : harga - 0
        }
        const carts = new Product(data)
        const status = await carts.save()
        res.send(JSON.stringify({"status" : 200, "error": null, "response" : status}))
    }
}


exports.ubahProduct = async (req,res) => {
    const harga = Number.parseInt(req.body.harga)
    const total_durasi = Number.parseInt(req.body.total_durasi)
    const total_murid = Number.parseInt(req.body.total_murid)
    const jumlah_video = Number.parseInt(req.body.jumlah_video)
    const img = req.body.img
    const nama_kursus = req.body.nama_kursus
    if(harga >= 5000000){
        const data = {
            total_durasi : total_durasi,
            total_murid : total_murid,
            jumlah_video : jumlah_video,
            img : img,
            nama_kursus : nama_kursus,
            harga : harga,
            diskon : harga - (((20/100) * harga) - 100000)
        }
        const carts = data
        const status = await Product.update({_id : id}, carts)
        res.send(JSON.stringify({"status" : 200, "error": null, "response" : status}))
    }else{
        const data = {
            total_durasi : total_durasi,
            total_murid : total_murid,
            jumlah_video : jumlah_video,
            img : img,
            nama_kursus : nama_kursus,
            harga : harga,
            diskon : harga - 0
        }
        const carts = data
        const status = await Product.update({_id : id}, carts)
        res.send(JSON.stringify({"status" : 200, "error": null, "response" : status}))
    }
}

exports.hapusProduct = async (req,res) => {
    let { id } = req.params
    const status = await Product.remove({_id : id})
    res.send(JSON.stringify({"status" : 200, "error" : null, "response" : status}))
}