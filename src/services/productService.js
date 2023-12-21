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

const deleteCollectionById = async (id) => {
    return products.deleteCollectionById(id);
};

const create = async (item) => {
    products.create(item);
};

module.exports = {
    getProducts,
    getProductById,
    getRelated,
    deleteProductById,
    getCollections,
    deleteCollectionById,
    create
}