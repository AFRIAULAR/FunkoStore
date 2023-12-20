const {conn} = require('../config/conn')
const items = require('../models/items');
const itemsEC = require('../middleware/uploadFiles')

const getAllItems = async () => {
    return await ItemModel.getAll();
  }

const getItems = async (params) => {
    return items.getItems(params);
}
  
  /*const editItem = async (item, id) => {
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
  
    return await ItemModel.editarItem(itemSchema, {product_id: id});
  }*/
  

module.exports = {
    getAllItems,
    getItems,
  
    //editItem,
}