const { conn } = require('../config/conn');

/*const getItems = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM product;');
        return rows;
    } catch (error){
        throw error;
    } finally {
        conn.releaseConnection();
    }
};*/

const getItems = async () => {
    try {
        const [rows] = await conn.query(`
            SELECT product.*, licence.licence_name
            FROM product
            INNER JOIN licence ON product.licence_id = licence.licence_id;
        `);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conn.releaseConnection();
    }
};


module.exports = {
    getItems
}