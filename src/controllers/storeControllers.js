const express= require ('express')
const productService = require('../services/productService');
const cartService = require('../services/cartService');


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
            // Renderizar la vista item.ejs y pasar el producto obtenido como datos
            res.render('store/item.ejs',{ producto : product,relacionados : related});
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error al obtener el producto');
        }
    },
    cartItem: async (req,res) => {
        try {
            const productId = req.params.id;
            const quantity = req.body.quantity;
            await cartService.addItemCart(productId,quantity);

            const referer = req.headers.referer || '/'; 
            res.redirect(referer);

        }
        catch (error){
            console.error('Error al añadir el producto al carro.',error);
            res.status(500).send('Error al añadir el producto al carro.');
        }
    },
    cart: async (req,res) => {
        try {
            res.render('store/cart')
        } catch (error) {
            console.error('Error al obtener datos del carrito:', error);
            res.status(500).send('Error al obtener el producto.',error);
        }
    }, /*solicitud del total? del carrito*/
    cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
