const express = require('express');
const router = express.Router();

const mainController = require('../controllers/storeControllers.js');
const storeControllers = require('../controllers/storeControllers.js');

router.get('/shop', storeControllers.shop),/*solicitud de datos*/
router.get('/shop/item/:id', storeControllers.item), /*solicitud de item especifico*/
router.post('/shop/item/:id/add', storeControllers.cartItem), /*envio de datos*/
router.get('/shop/cart', storeControllers.cart), /*solicitud del total? del carrito*/
router.post('/shop/cart', storeControllers.cartPay),/*envio de solicitud? de pago*/

module.exports=router
