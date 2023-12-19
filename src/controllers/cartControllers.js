const cartService = require('../services/cartService');

module.exports = {
    cartItem: async (req,res) => {
        try {
            user = req.session.user
            console.log(user);
            const productId = req.params.id;
            const quantity = req.body.quantity;
            console.log(req.session.user.userId);
            await cartService.addItemCart(productId,quantity,user.userId);

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
            await cartService.removeById(req.session.user.userId,detailId);
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
            user = req.session.user;
            const items = await cartService.getItems(user.userId);
            const info = await cartService.getTotal(user.userId);
            res.render('store/cart',{items: items,info: info})
        } catch (error) {
            console.error('Error al obtener datos del carrito:', error);
            res.status(500).send('Error al obtener datis del carrito.',error);
        }
    },
    cartPay: (req,res) => {
        try {
            user = req.session.user;
            cartService.payItems(user.userId);
            const referer = req.headers.referer || '/';
            res.redirect(referer); 
        } catch(error) {
            console.error('Error al pagar items:', error);
            res.status(500).send('Error al pagar los items.',error);
        }
    },
};