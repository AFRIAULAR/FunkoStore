const cartService = require('../services/cartService');

module.exports = {
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
    cart: async (req,res) => {
        try {
            const items = await cartService.getItems(1);
            const info = await cartService.getTotal(1);
            res.render('store/cart',{items: items,info: info})
        } catch (error) {
            console.error('Error al obtener datos del carrito:', error);
            res.status(500).send('Error al obtener datis del carrito.',error);
        }
    } /*solicitud del total? del carrito*/
};