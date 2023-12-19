const express = require('express');
const productService = require('../services/productService');
const itemsService = require('../services/itemService');

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
    res.render('admin/create.ejs'
      )
},
creating: async (req, res) => {
    const item = req.body;
    const files = req.files;
    await itemsService.createItem(item, files);
    res.redirect('/admin');
  },
editItem:  async (req, res) => {
    const id = req.params.id;
    const { data: categories } = await productService.getCategories();
    const { data: licences } = await productService.getLicenceByProductId();
    const { data } = await ItemsService.getItem(id);
    console.log(categories, licences);
    res.render('./admin/edit', {
      view: {
        title: `Edit Product #${id} | Admin Funkoshop`
      },
      item: data[0],
      categories,
      licences
    });
  },

editingItem: async (req, res) => {
    const id = req.params.id;
    const item = req.body;

    await ItemsService.edit(item, id);
    res.redirect('/admin');
  },
delete: (req,res) => res.send ('administrador eliminando item'), /*eliminar recursos del servidor*/
}