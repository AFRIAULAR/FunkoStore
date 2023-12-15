const mysql = require('mysql2');
require('dotenv').config();
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'funko_test',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const getConnection = async () => {
  try {
      const connection = await pool.getConnection();
      console.log('Conexión a la base de datos establecida con éxito desde getConnection');
      return connection;
  } catch (error) {
      console.error('Error al obtener la conexión:', error);
      throw error;
  }
};

/*const hashPasswords = async () => {
  let connection;
  try {
      connection = await pool.getConnection();

      if (connection) {
          console.log('Conexión disponible, ejecutando consulta...');
          const [rows] = await connection.query('SELECT user_id, password FROM user WHERE password IS NOT NULL');

          console.log('Filas obtenidas:', rows);

          for (const row of rows) {
              console.log('Procesando fila:', row);

              // ... (resto del código)
          }

          console.log('Contraseñas hasheadas con éxito.');
      } else {
          console.error('La conexión no está disponible.');
      }
  } catch (error) {
      console.error('Error al obtener la conexión o ejecutar consulta:', error);
  } finally {
      try {
          if (connection) {
              connection.release();
              console.log('Conexión liberada desde hashPasswords');
          }
      } catch (releaseError) {
          console.error('Error al liberar la conexión:', releaseError);
      }
  }
}; 
hashPasswords();*/
//hashea contraseñas que no han sido hasheadas, pero se vuelve incompatible con el codigo y no conecta del todo

module.exports = {
    conn: pool.promise()
};