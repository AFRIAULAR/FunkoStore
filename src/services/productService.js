const { conn } = require('../config/conn');

const products = require('../models/products');

const getProducts = async (params) => {
    return products.getProducts(params);
};

const getProductById = async (id) => {
    return products.getProductById(id);
};

const getRelatedProduct = async (productId) => {
    try {
        const sql = `
        SELECT 
        p.product_id,
        p.product_name,
        p.price,
        p.image_front,
        l.licence_name
        FROM product p
        INNER JOIN licence l ON p.licence_id = l.licence_id
        WHERE p.licence_id = (
            SELECT licence_id FROM product WHERE product_id = ?
            ) AND p.product_id != ? AND p.licence_id IS NOT NULL
            LIMIT 3;
        `;

        const [results] = await conn.query(sql, [productId, productId]);
        return results;
    } catch (error) {
        throw error;
    }
};

const getItems = async () => {
    try {
        const sql = `
            SELECT 
                p.product_id,
                p.sku,
                p.product_name,
                l.licence_name
            FROM 
                product p
            INNER JOIN
                licence l ON p.licence_id = l.licence_id
                ORDER BY product_id;
        `;

        const [results] = await conn.query(sql);
        return results;
    } catch (error) {
        console.error('Error al obtener información de productos:', error);
        throw error;
    }
};

/*const getItemsOrderedById = async () => {
    try {
        const [results] = await conn.promise().query('SELECT * FROM product ORDER BY product_id');
        return results;
    } catch (error) {
        console.error('Error al obtener información de productos:', error);
        throw error;
    }
};*/

const getLicenceByProductId = async (productId) => {
    try {
        const [row] = await conn.query('SELECT licence.licence_name FROM product INNER JOIN licence ON product.licence_id = licence.licence_id WHERE product.product_id = ?;', [productId]);
        return row;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getCategories = async () => {
    return await products.getAll();
  }


module.exports = {
    getProducts,
    getProductById,
    getRelatedProduct,
    //getItemsOrderedById,
    getItems,
    getLicenceByProductId,
    getCategories,
}