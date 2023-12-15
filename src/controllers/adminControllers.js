const express = require('express');
const productService = require('../services/productService');

module.exports = {
admin: async (req, res) => {
        try {
            const product = await productService.getItems(); // Asegúrate de tener datos aquí
            res.render('admin/listado.ejs', { product: product });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error al obtener el producto');
        }
      },
create:(req,res) => {
    res.render('admin/create.ejs')
},
creating: (req,res) => res.send ('Admin creando producto'), /*envio de datos*/
editItem: (req,res) => {
    res.render('admin/edit.ejs')
}, 
editingItem: (req,res) => res.send ('Admin ctualizando item'), /*actualizar o crear datos*/
delete: (req,res) => res.send ('administrador eliminando item'), /*eliminar recursos del servidor*/
}