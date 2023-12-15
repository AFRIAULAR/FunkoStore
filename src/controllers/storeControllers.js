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
            const productId = req.params.id;
            const product = await productService.getProductById(productId);
            const licence = await productService.getLicenceByProductId(productId);
            const related = await productService.getRelatedProduct(productId);
            res.render('store/item.ejs',{ producto : product, licence : licence, relacionados : related});    
            //res.render('store/item.ejs', { producto: product, relacionados: related, licence: licence });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error al obtener el producto');
        }
    },
    
    /*cartItem: (req,res) => {
        try {
            const productId = req.params.id;
            const quantity = req.body.quantity;
            cartService.addItemCart(productId,quantity);

            const referer = req.headers.referer || '/'; 
            res.redirect(referer);

        }
        catch (error){
            console.error('Error al añadir el producto al carro.',error);
            res.status(500).send('Error al añadir el producto al carro.');
        }
    },

    removeCartItem: async(req,res) => {
        try{
            const detailId = req.params.id;
            await cartService.removeById(1,detailId);
            const referer = req.headers.referer || '/'; 
            res.redirect(referer);
        }
        catch (error){
            console.error('Error al reniver el item del carrito:', error);
            res.status(500).send('Error al remover el item del carrito.',error);
        } 
    },

    cart: async (req, res) => {
        try {
            const Carrito = await cartService.getItems();
            res.render('store/cart.ejs',{Carrito})
        }
        catch(error) {
            console.error('Error al obtener los productos',error);
            res.status(500).send('Error al obtener productos');
        }
    }, */

    cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
