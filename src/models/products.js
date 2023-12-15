const { conn } = require('../config/conn');

const getProducts = async () => { /*Obtengo todos los productos*/
    try {
        const [rows] = await conn.query('SELECT * FROM product;');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getProductById = async (productId) => {  /* */
    try {
        const [row] = await conn.query('SELECT * FROM product WHERE product_id = ?;', [productId]);
        return row;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getProductsByLicence = async (licence) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE licence_id = ?;', [licence]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getProductsMinorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE price <= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getProductsMajorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE price >= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};
 

const getRelated = async (productId) => {
    try {
        const [row] = await conn.query(`
            SELECT 
                p.product_id,
                p.product_name,
                p.product_price,
                p.image_front,
                l.licence_name
            FROM product p
            INNER JOIN licence l ON p.licence_id = l.licence_id
            WHERE p.licence_id = (
                SELECT licence_id FROM product WHERE product_id = ?
            )
            AND p.product_id != ?
            LIMIT 3;
        `, [productId, productId]);

        return row;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getLicenceByProductId = async (productId) => {
    try {
        const [row] = await conn.query('SELECT licence.* FROM product INNER JOIN licence ON product.licence_id = licence.licence_id WHERE product.product_id = ?;', [productId]);
        return row;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsByLicence,
    getProductsMajorPriceRange,
    getProductsMinorPriceRange,
    getRelated,
    getLicenceByProductId,
} 