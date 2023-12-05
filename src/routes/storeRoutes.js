const express = require('express');
const router = express.Router();

const storeControllers = require('../controllers/storeControllers.js');

router.get('/', storeControllers.shop),/*solicitud de datos*/
router.get('/item/:id', storeControllers.item), /*solicitud de item especifico*/
router.post('/item/add_to_cart/:id', storeControllers.cartItem), /*envio de datos*/
router.get('/cart', storeControllers.cart), /*solicitud del total? del carrito*/
router.post('/cart', storeControllers.cartPay),/*envio de solicitud? de pago*/

module.exports=router
