const { conn } = require('../config/conn');


const addProduct = async (id, quantity) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (product_id, quantity) VALUES (?, ?);', [id, quantity]);
        const insertId = insertResult[0].insertId;
        console.log("insertId = " + insertId);
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?, ?);', [insertId, 1]);
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const addCollection = async (id, quantity) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (collection_id, quantity) VALUES (?, ?);', [id, quantity]);
        const insertId = insertResult[0].insertId; // Asegúrate de seleccionar el campo correcto
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?, ?);', [insertId]);
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const getItems = async (id) => {
    try {
        const [result] = await conn.query(
            'SELECT p.*,cd.quantity AS quantity, cd.cart_detail_id AS detail_id , (cd.quantity * p.price) AS total_price\
            FROM product p\
            INNER JOIN cart_detail cd ON p.product_id = cd.product_id\
            INNER JOIN cart c ON cd.cart_detail_id = c.cart_detail_id\
            WHERE c.cart_owner = 1 and cd.done IS NULL;'
        );
        return result
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const getTotal = async(id) => {
    try {
        const [result] = await conn.query(
        'SELECT\
            SUM(cd.quantity * p.price) AS Total,\
            COUNT( cd.quantity) AS cant_items\
        FROM product p\
        INNER JOIN cart_detail cd ON p.product_id = cd.product_id\
        INNER JOIN cart c ON cd.cart_detail_id = c.cart_detail_id\
        WHERE c.cart_owner = 1 AND cd.done IS NULL;'
        );
        return result
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const removeById = async (idOwner,idDetail) => {
    try {
        const [result] = await conn.query(
        'DELETE FROM cart WHERE cart_detail_id = ? AND cart_owner = ?',[idDetail,idOwner]
        );
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const getLicence = async (id) => {
    try {
        const [result] = await conn.query(
            'SELECT * FROM licence WHERE licence_id = ?',
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};
module.exports = {
    addProduct,
    addCollection,
    getItems,
    getTotal,
    removeById,
    getLicence,
}