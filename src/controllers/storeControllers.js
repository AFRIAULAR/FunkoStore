const express= require ('express')
const productService = require('../../services/productService');


module.exports = {
    shop: async (req, res) =>{
        try {
            const products = await productService.getProducts();
            res.render('store/shop.ejs',{products})
        }
        catch(error) {
            console.error('Error al obtener los productos');
            res.status(500).send('Error al obtener productos');
        }
    },
    item: (req,res) => res.send ('Pagina de item'), /*solicitud de item especifico*/
    cartItem: (req,res) => res.send ('Pagina de agregar item'), /*envio de datos*/
    cart: (req,res) => res.send ('Pagina de carrito de compras'), /*solicitud del total? del carrito*/
    cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
