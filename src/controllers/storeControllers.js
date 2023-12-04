const express= require ('express')
const productService = require('../services/productService');


module.exports = {
    shop: async (req, res) => {
        try {
            const products = await productService.getProducts();
            res.render('store/shop.ejs',{products})
        }
        catch(error) {
            console.error('Error al obtener los productos',error);
            res.status(500).send('Error al obtener productos');
        }
    },
    item: async (req, res) => {
        try {
            const productId = req.params.id; // parámetro de la URL
            const product = await productService.getProductById(productId);
            const related = await productService.getRelated(productId);
            console.log(product)
            // Renderizar la vista item.ejs y pasar el producto obtenido como datos
            res.render('store/item.ejs',{ producto : product,relacionados : related});
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error al obtener el producto');
        }
    },
    cartItem: (req,res) => res.send ('Pagina de agregar item'), /*envio de datos*/
    cart: (req,res) => res.send ('Pagina de carrito de compras'), /*solicitud del total? del carrito*/
    cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
