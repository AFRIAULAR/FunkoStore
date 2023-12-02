const products = require('../models/products');

const getProducts = async (params) => {
    return products.getProducts(params);
};

const getProductById = async (id) => {
    return products.getProductById(id);
}


module.exports = {
    getProducts
}