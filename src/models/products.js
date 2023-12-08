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
}

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
}

const getProductsMinorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE price <= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductsMajorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE price >= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}
  // 'SELECT * FROM product WHERE product_id IN(\ 
            //    SELECT DISTINCT product_id FROM Product \
            //        WHERE licence_id IN(\
            //            SELECT license_id FROM licence\
            //            WHERE product_id = ?) AND product_id != ?\
            //            
const getRelated = async (productId) => {
    try {
        const [rows] = await conn.query(`
        SELECT product.*, category.category_name, licence.licence_name
        FROM (product
        LEFT JOIN category ON product.category_id = category.category_id)
        LEFT JOIN licence ON product.licence_id = licence.licence_id
        WHERE product.product_id != ?;`, [productId]);     
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

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