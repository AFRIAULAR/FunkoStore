const { conn } = require('../config/conn');
const crypt = require('bcryptjs')

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

const verificarUser = async (user_id) => {
	try {
		const [verificado] = await conn.query(`SELECT * FROM user WHERE user_id = "${user_id}";`)
		return verificado
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
	} finally {s
		conn.releaseConnection()
	}
}

module.exports = {
	crearUsuario,
	verificarUser,
    getUserRole,
    //login,
}