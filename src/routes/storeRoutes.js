const express = require('express');
const router = express.Router();

const mainController = require('../controllers/storeControllers.js');

router.get('/shop', (req,res) => res.send ('Pagina de shop'))/*solicitud de datos*/
router.get('/shop/item/:id' , (req,res) => res.send ('Pagina de item')) /*solicitud de item especifico*/
router.post('/shop/item/:id/add', (req,res) => res.send ('Pagina de agregar item')) /*envio de datos*/
router.get('/shop/cart', (req,res) => res.send ('Pagina de carrito de compras')) /*solicitud del total? del carrito*/
router.post('/shop/cart', (req,res) => res.send ('Pagina de carrito de compras')) /*envio de solicitud? de pago*/

module.exports=router
