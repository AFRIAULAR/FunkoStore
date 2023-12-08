const { conn } = require('../config/conn');

const addProduct = async (id, quantity) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (product_id, quantity) VALUES (?, ?);', [id, quantity]);
        const inserId = insertResult[0].insertId;
        console.log("inserid = " + inserId)
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?,?);',[inserId,1]);
           
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const addCollection = async (id, quantity) => {
    try {
        const insertResult = await conn.query('INSERT INTO cart_detail (collection_id,quantity) VALUES (?,?);',[id,quantity]);
        inserId = insertResult[0];
        await conn.query('INSERT INTO cart (cart_detail_id, cart_owner) VALUES (?,1);',[inserId]);
           
    } catch (error){
        throw error;
    } finally{
        conn.releaseConnection();
    }
};

const getItems = async (id) => {
    
};

module.exports = {
    addProduct,
    addCollection
}