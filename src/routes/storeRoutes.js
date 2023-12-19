const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

const storeControllers = require('../controllers/storeControllers.js');
const cartControllers = require('../controllers/cartControllers.js');

const isLogged = authentication.isLogged; // Middleware de autenticación

router.use('/cart', isLogged); // Aplicar el middleware a todas las rutas '/cart'

router.get('/', storeControllers.shop); // Solicitud de datos
router.get('/item/:id', storeControllers.item); // Solicitud de item específico
router.post('/item/add_to_cart/:id',isLogged , cartControllers.cartItem); // Envío de datos
router.post('/cart/remove_item/:id', cartControllers.removeCartItem);
router.get('/cart', cartControllers.cart); // Solicitud del total del carrito
router.post('/cart', cartControllers.cartPay); // Envío de solicitud de pago

module.exports = router;
