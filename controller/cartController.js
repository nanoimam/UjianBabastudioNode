const Cart = require("../models/cart")
const Product = require("../models/kursus")

exports.addToCart = async (req, res) => {
    const userCart = req.params.id
    const productCart = req.body.productCart
    const qty = Number.parseInt(req.body.qtyCart)

    const dataCart = await Cart.count({ userCart: userCart, productCart: productCart })
    if (dataCart == 0) {
        const data = {
            productCart: productCart,
            qtyCart: qty,
            userCart: userCart
        }

        console.log(data)
        const carts = new Cart(data)
        const saveCart = await carts.save()
        res.send(JSON.stringify({ "status": 200, "error": null, "response ": "Success add to Cart" }))
    }
    else {
        const dataCart = await Cart.find({ userCart: userCart, productCart: productCart }).lean()
        dataCart.qtyCart = Number.parseInt(dataCart.qtyCart) + qty
        const updateCart = await Cart.updateOne({ _id: dataCart._id }, dataCart)
        res.send(JSON.stringify({ "status": 200, "error": null, "response": "Success add to cart" }))
    }
    // Jalankan api untuk addtocart dengan userCart 
    // merupakan id dari collection users dan productCart 
    // merupakan id dari collection products
}

const showDataCart = async (idUser) => {
    const data = await Cart.find({
        userCart: idUser
    }).populate("productCart").lean()
    data.forEach(row => {
        row.subTotal = Number.parseInt(row.productCart.price) * row.qtyCart
    })
    return data
}

exports.showCart = async (req, res) => {
    const idUser = req.params.id
    const data = await showDataCart(idUser)
    res.send(JSON.stringify({ "status": 200, "error": null, "response": data }))
}

exports.editCart = async (req, res) => {
    const userCart = req.params.id
    const productCart = req.body.productCart
    const qty = Number.parseInt(req.body.qtyCart)
    if (qty > 0) {
        const dataCart = await Cart.findOneAndUpdate({ userCart: userCart, productCart: productCart }, {
            qtyCart: qty
        })
    }
    else if (qty <= 0) {
        const deleteCart = await Cart.findOneAndDelete({ userCart: userCart, productCart: productCart })
    }
    const data = await showDataCart(userCart)
    res.send(JSON.stringify({ "status": 200, "error": null, "response": data }))
}

exports.deleteCart = async (req, res) => {
    const userCart = req.params.id
    const productCart = req.body.productCart
    const deleteCart = await Cart.findOneAndDelete({ userCart: userCart, productCart: productCart })
    const data = await showDataCart(userCart)
    res.send(JSON.stringify({ "status": 200, "error": null, "response": data }))
}

exports.removeCart = async (req, res) => {
    const userCart = req.params.id
    const hapusCart = await Cart.deleteMany({ userCart: userCart })
    res.send(JSON.stringify({ "status": 200, "error": null, "response": "Cart Deleted" }))
}

exports.checkOut = async (req, res) => {
    const userCart = req.params.id
    const dataCart = await Cart.count({ userCart: userCart })
    if (dataCart <= 0) {
        res.status(400)
    }
    else {
        let total = 0
        const data = await showDataCart(userCart)
        data.forEach(row => {
            total = total + row.subTotal
        })
        const dataSave = {
            userOrder: userCart,
            totalOrder: total
        }
        // const orderss = new Order(dataSave)
        // const saveOrder = await orderss.save()

        data.forEach(async rows => {
            const dataDetail = {
                idOrder: saveOrder._id,
                productOrder: rows.productCart._id,
                qtyOrder: rows.qtyCart,
                subTotalOrder: rows.subTotal
            }
            const details = new OrderDetail(dataDetail)
            const saveDetail = await details.save()
        })
        const hapusCart = await Cart.deleteMany({ userCart: userCart })
        res.send(JSON.stringify({ "status": 200, "error": null, "response": "Alhamdulillah Transaksi Berhasil" }))
    }
}