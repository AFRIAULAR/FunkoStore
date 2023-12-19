const items = require('../models/items');
const itemsEC = require('../middleware/uploadFiles')

const getAllItems = async () => {
    return await ItemModel.getAll();
  }

const getItems = async (params) => {
    return items.getItems(params);
};

const createItem = async (item, files) => {
    try {
        if (!files || files.length < 2) {
          throw new Error('Se requieren al menos dos archivos (imagen delantera y trasera).');
        }
    const itemSchema = {
      product_name: item.name,
      product_description: item.description,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      sku: item.sku,
      dues: item.dues,
      image_front: '/'+files[0].filename,
      image_back: '/'+files[1].filename,
      licence_id: item.collection,
      category_id: item.category
    }
    return await items.crearItem([Object.values(itemSchema)]);
  }  catch (error) {
    console.error('Error al crear el ítem:', error.message);
    throw error; 
  }
};
  
  const editItem = async (item, id) => {
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
  }
  

module.exports = {
    getAllItems,
    getItems,
    createItem,
    editItem,
}