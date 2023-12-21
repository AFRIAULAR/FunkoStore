const products = require('../models/products');

const getProducts = async (params) => {
    return products.getProducts(params);
};

const getProductById = async (id) => {
    return products.getProductById(id);
};

const getRelated = async (id) => {
    return products.getRelated(id);
};

const deleteProductById = async(id) => {
    return products.deleteProductById(id);
};

const getCollections = async () => {
    return products.getCollections();
};


module.exports = {
    getProducts,
    getProductById,
    getRelated,
    deleteProductById,
    getCollections

}