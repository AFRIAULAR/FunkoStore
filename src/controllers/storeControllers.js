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
            const related = await productService.getRelated(productId);
            if (!licence) {
                console.error('Licencia no encontrada para el producto:', productId);
            }
    
            res.render('store/item.ejs', { producto: product, relacionados: related, licence: licence });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error al obtener el producto');
        }
    },
    
    cartItem: (req,res) => {
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
    cart: (req,res) => res.send ('Pagina de carrito de compras'), /*solicitud del total? del carrito*/
    cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
