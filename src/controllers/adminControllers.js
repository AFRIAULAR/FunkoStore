const express = require('express');
const {conn} = require('../config/conn')
const productService = require('../services/productService');
const itemsService = require('../services/itemService');
const modelsProduct = require('../models/products')
const path = require('path');



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
 
      const item = req.body
  
      const itemSchema = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        price: req.body.price,
        stock: req.body.stock,
        discount: req.body.discount,
        sku: req.body.sku,
        dues: req.body.dues,
        image_front: '/proximamente1.jpg',
        image_back: '/proximamente.jpg',
        licence_id: req.body.licence_id,
        category_id: req.body.category_id,
      };
      
      console.log('req.body:', itemSchema);
  
      await modelsProduct.create(itemSchema);
      res.redirect('/admin') 
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

editingItem: async (item, id) => {
  const itemSchema = {
    product_name: item.name,
    product_description: item.description,
    price: item.price,
    stock: item.stock,
    discount: item.discount,
    sku: item.sku,
    dues: item.dues,
    image_front: '/imagen_front',
    image_back: '/imagen_front',
    licence_id: item.collection,
    category_id: item.category
  }

  return await ItemModel.editarItem(itemSchema, {product_id: id}),
  
  res.redirect('/admin');
},


delete: (req,res) => res.send ('administrador eliminando item'), /*eliminar recursos del servidor*/
}