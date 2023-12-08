const { conn } = require('../config/conn');

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
const getLicenceByProductId = async (productId) => {
    try {
        const [rows] = await conn.query('SELECT licence.licence_name FROM product INNER JOIN licence ON product.licence_id = licence.licence_id WHERE product.product_id = ?;', [productId]);
        return rows[0]; // asumiendo que solo esperas una fila
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

module.exports = {
    getProducts,
    getProductById,
    getRelated,
    getLicenceByProductId,
}