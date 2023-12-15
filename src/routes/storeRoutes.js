const express = require('express');
const router = express.Router();

const storeControllers = require('../controllers/storeControllers.js');
const cartControllers = require('../controllers/cartControllers.js');

router.get('/', storeControllers.shop),/*solicitud de datos*/
router.get('/item/:id', storeControllers.item), /*solicitud de item especifico*/
router.post('/item/add_to_cart/:id', cartControllers.cartItem), /*envio de datos*/
router.post('/cart/remove_item/:id', cartControllers.removeCartItem),
router.get('/cart', cartControllers.cart), /*solicitud del total? del carrito*/
router.post('/cart', storeControllers.cartPay),/*envio de solicitud? de pago*/

module.exports=router
