const express= require ('express')

module.exports = {
shop: (req,res) => res.send ('Pagina de shop'),/*solicitud de datos*/
item: (req,res) => res.send ('Pagina de item'), /*solicitud de item especifico*/
cartItem: (req,res) => res.send ('Pagina de agregar item'), /*envio de datos*/
cart: (req,res) => res.send ('Pagina de carrito de compras'), /*solicitud del total? del carrito*/
cartPay: (req,res) => res.send ('Pagina de carrito de compras'), /*envio de solicitud? de pago*/
}
