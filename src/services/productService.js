const products = require('../models/products');

const getProducts = async (params) => {
    return products.getProducts(params);
};

const getProductById = async (id) => {
    return products.getProductById(id);
};

const getRelated = async (id) => {
    return products.getRelated(id);
}


module.exports = {
    getProducts,
    getProductById,
    getRelated
}