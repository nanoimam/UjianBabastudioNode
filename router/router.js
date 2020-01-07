const productsController = require('../controller/productsController')
const userController = require('../controller/userController')
const cartController = require('../controller/cartController')
module.exports = app => {
    app.get('/', productsController.home)
    

    //api
    app.get('/kursus', productsController.listProduct)
    app.get('/kursus/:id', productsController.detailProduct)
    app.post('/kursus/', productsController.tambahProduct)
    app.put('/kursus/:id', productsController.ubahProduct)
    app.delete('/kursus/:id', productsController.hapusProduct)

    // //app users
    app.get('/user', userController.listUser)
    app.get('/user/:id', userController.detailUser)
    app.post('/user/', userController.tambahUser)
    app.put('/user/:id', userController.ubahUser)
    app.delete('/user/:id', userController.hapusUser)

    // api cart
    app.post("/cart/:id", cartController.addToCart)
    app.get("/cart/:id", cartController.showCart)
    app.put("/cart/:id", cartController.editCart)
    app.delete("/cart/:id", cartController.deleteCart)
    app.get("/cart/remove/:id", cartController.removeCart)
    // Jalankan api untuk showCart dengan parameter 
    // id yang di dapatkan dari user id


    // CheckOut
    app.get("/cart/checkout/:id", cartController.checkOut)
}