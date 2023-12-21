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

const getProducsByLicence = async (licence) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE licence_name = ?;', [licence]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductsMinorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_price <= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getProductsMajorPriceRange = async (priceRange) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_price >= ?;', [princeRange]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getRelated = async (productId) => {
    try {
        const [rows] = await conn.query(
            'SELECT * FROM product WHERE product_id IN(\
                SELECT DISTINCT product_id FROM CollectionProduct \
                    WHERE collection_id IN(\
                        SELECT collection_id FROM CollectionProduct\
                        WHERE product_id = ?) AND product_id != ?\
            );', [productId, productId]
        );
        return rows;
    }
    catch (error) {
        throw error;
    }
    finally {
        conn.releaseConnection();
    }
}

const getCollections = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM collection');
        return rows
    } catch (error) {
        console.log(error);
    } finally {
        conn.releaseConnection();
    }
};

const deleteProductById = async (productId) => {
    try {
        await conn.query('DELETE FROM product WHERE product_id = ?;', [productId]);
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const deleteCollectionById = async (collectionId) => {
    try {
        await conn.query('DELETE FROM collection WHERE collection_id = ?;', [productId]);
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const create = async (params) => {
    try {
        const [rows] = await conn.query('INSERT INTO product SET ? ;', params)
        return rows
    } catch (error) {
        throw error
    } finally {
        conn.releaseConnection()
    }
}
const update = async (productId, updatedParams) => {
    try {
        const row = await conn.query('UPDATE product\
            SET \
            licence_name = ?,\
            category_name = ?,\
            product_name = ?,\
            product_description = ?,\
            product_price = ?,\
            dues = ?,\
            product_sku = ?,\
            img_front = ?,\
            img_back = ?.\
        WHERE product_id = ?;\
        ',updateParams.licence_name,updateParams.category_name,updateParams.product_name,updateParams.product_description,
        updateParams.product_price,updateParams.dues,updateParams.product_sku,updateParams.img_front,updateParams.img_back,productId);
        console.log(query + "    " + productId)
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};



module.exports = {
    getProducts,
    getProductById,
    getProducsByLicence,
    getProductsMajorPriceRange,
    getProductsMinorPriceRange,
    getRelated,
    getCollections,
    deleteProductById,
    create,
    update
}