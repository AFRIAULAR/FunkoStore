const { conn } = require('../config/conn');

const addProduct = async (id, quantity,owner) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (product_id, quantity) VALUES (?, ?);', [id, quantity]);
        const inserId = insertResult[0].insertId;
        console.log("inserid = " + inserId)
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?,?);',[inserId,owner]);
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const addCollection = async (id, quantity,owner) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (collection_id,quantity) VALUES (?,?);',[id,quantity]);
        inserId = insertResult[0];
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?,?);',[inserId,owner]);
           
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const getItems = async (id) => {
    try {
        const [result] = await conn.query(
            'SELECT p.*,cd.quantity AS quantity, cd.cart_detail_id AS detail_id , (cd.quantity * p.product_price) AS total_price\
            FROM product p\
            INNER JOIN cart_detail cd ON p.product_id = cd.product_id\
            INNER JOIN cart c ON cd.cart_detail_id = c.cart_detail_id\
            WHERE c.cart_owner = ? and cd.paid IS NULL;',[id]
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
            SUM(cd.quantity * p.product_price) AS Total,\
            COUNT( cd.quantity) AS cant_items\
        FROM product p\
        INNER JOIN cart_detail cd ON p.product_id = cd.product_id\
        INNER JOIN cart c ON cd.cart_detail_id = c.cart_detail_id\
        WHERE c.cart_owner = ? AND cd.paid IS NULL;',[id]
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

const payItems = async (idOwner) => {
    try {
        await conn.query(
            'UPDATE cart_detail\
            SET paid = NOW()\
            WHERE paid IS NULL AND cart_detail_id in (SELECT cart_detail_id FROM cart WHERE cart_owner = ?);',[idOwner]
        );
    } catch(error) {
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
    payItems
}