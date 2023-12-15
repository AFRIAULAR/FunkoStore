const express = require ('express-validator')
const {conn} = require ('../config/conn')
const crypt = require('bcryptjs')


const isLogged = (req, res, next) => {
    if (req.session.isLogged) {
     return next();
    }
  
    return res.status(401).send('Necesitas estar logueado para ingresar');
  }
  
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
    } finally {
      conn.releaseConnection()
    }
  }
  
  const userCredentials = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [verificado] = await conn.query('SELECT user_id, name, lastname, email, password FROM user WHERE email = ?', [email]);

        if (!verificado || verificado.length === 0) {
            console.log('Usuario no encontrado:', [verificado]);
            return null;
        }

        console.log('Información del usuario:', verificado);
        const { user_id, name, lastname, email, password: storedPassword } = verificado[0];

        console.log('Contraseña almacenada:', storedPassword);

        const contraseñaCorrecta = await bcrypt.compare(password, storedPassword);

        return contraseñaCorrecta ? { user_id, name, lastname, email } : null;
    } catch (error) {
        console.error('Error al iniciar sesión middle:', error);
        return null;
    }
}

  module.exports = { 
    isLogged,
    crearUsuario,
    verificarUser,
    getUserRole,
    userCredentials,
  }
 