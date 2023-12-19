const { conn } = require('../config/conn');

const getAll = async () => {
    try {
      const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id;');
      const response = {
        isError: false,
        data: rows
      };
  
      return response;
    } catch (e) {
      const error = {
        isError: true,
        message: `No pudimos recuperar los datos ${e}.`
      };
  
      return error;
    } finally {
      await conn.releaseConnection();
    }
  }

const getItems = async () => {
    try {
        const [rows] = await conn.query(`
            SELECT * FROM product;
        `);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        conn.releaseConnection();
    }
};

const crearItem = async (params) => {
    try {
      const [rows] = await conn.query('INSERT INTO product (product_name, product_description, price, stock, discount, sku, dues, image_front, image_back, licence_id, category_id) VALUES ?;', [params]);
  
      const response = {
        isError: false,
        data: rows
      };
  
      return response;
    } catch (e) {
      const error = {
        isError: true,
        message: `No pudimos crear los valores seleccionados por: ${e}`
      };
  
      return error;
    } finally {
      await conn.releaseConnection();
    }
  };
  
  const editarItem = async (params, id) => {
    try {
      const [rows] = await conn.query('UPDATE product SET ? WHERE ?;', [params, id]);
      const response = {
        isError: false,
        message: `El item fue modificado exitosamente.`,
        status: rows
      };
  
      return response;
    } catch (e) {
      const error = {
        isError: true,
        message: `No pudimos modificar el item seleccionado, error: ${e}`
      };
  
      return error;
    } finally {
      await conn.releaseConnection();
    }
  };

module.exports = {
    getAll,
    getItems,
    crearItem,
    editarItem,
}