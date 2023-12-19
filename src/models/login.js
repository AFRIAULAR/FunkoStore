const { conn } = require('../config/conn');
const bcrypt = require('bcrypt');


const crearUsuario = async (userInfo) => {
	try {
        const { name, lastname, email, password } = userInfo;
        const hash = await crypt.hash(password, 12);
        const [creado] = await conn.query(`
            INSERT INTO user (name, lastname, email, password) 
            VALUES ("${name}", "${lastname}", "${email}", "${hash}");
        `);
        return creado;
    } catch (error) {
        console.log(error);
        throw error; // Sería ideal manejar el error de manera adecuada, posiblemente lanzándolo nuevamente para ser capturado en otro lugar
    } finally {
        conn.releaseConnection();
    }
}

/*	const hash = await crypt.hash(password, 12)
	try {
		const [creado] = await conn.query(`INSERT INTO user (name, lastname, email, password) 
			VALUES ("${nombre}", "${hash}");`)
		return creado
	} catch (error) {
		console.log(error)
	} finally {
		conn.releaseConnection()
	}
}*/

const getUserByEmail = async (email) => {
    try {
        const user_info = await conn.query('SELECT * FROM user WHERE email = ?',[email]);
        return user_info;
    } catch (error) {
        throw error; // Sería ideal manejar el error de manera adecuada, posiblemente lanzándolo nuevamente para ser capturado en otro lugar
    } finally {
        conn.releaseConnection();
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
};

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
      return creado [0]
    } catch (error) {
		console.error(error);
        throw error;
    } finally {
      conn.releaseConnection()
    }
  }

module.exports = {
	crearUsuario,
	getUserByEmail,
	verificarUser,
    getUserRole,
    registerUser,
}