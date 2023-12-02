const { conn } = require('../config/conn');

const getProducts = async () => { /*Obtengo todos los productos*/
    try {
        const  [rows] = await conn.query('SELECT * FROM product;');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductById = async (productId) => {  /* */
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_id = ?;',[productId]);
        return rows;
    }catch (error){
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getProducsByLicence = async (licence) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE licence_name = ?;',[licence]);
        return rows;
    }catch (error){
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductsMinorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_price <= ?;',[princeRange]);
        return rows;
    }catch (error){
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductsMajorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_price >= ?;',[princeRange]);
        return rows;
    }catch (error){
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProducsByLicence,
    getProductsMajorPriceRange,
    getProductsMinorPriceRange
}