const { conn } = require('../config/conn');
const bcrypt = require('bcrypt');


const crearUsuario = async (name, lastname, email, password) => {
	const hash = await crypt.hash(password, 12)
	try {
		const [creado] = await conn.query(`INSERT INTO user (name, lastname, email, password) 
			VALUES ("${nombre}", "${hash}");`)
		return creado
	} catch (error) {
		console.log(error)
	} finally {
		conn.releaseConnection()
	}
}



const getUserRole = async (user_id) => {
	try {
		const [verificado] = await conn.query(`SELECT * FROM user_has_role WHERE role_role_id = "${user_id}";`)
		return verificado
	} catch (error) {
		console.log(error)
	} finally {
		conn.releaseConnection()
	}
}

const registerUser = async (name, lastname, email, password) => {
    const hash = await bcrypt.hash(password, 12)
    try {
      const [creado] = await conn.query('INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)',
	  [name, lastname, email, hash]);
      return creado
    } catch (error) {
		console.error(error);
        throw error;
    } finally {
      conn.releaseConnection()
    }
  }

module.exports = {
	crearUsuario,
    getUserRole,
    registerUser,
}