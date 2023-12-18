const validator = require('express-validator')


const isLogged = (req, res, next) => {
    if (req.session.isLogged) {
        return next();
    }

    return res.status(401).send('Necesitas estar logueado para ingresar');
};

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
};

module.exports = {
    isLogged,
    userCredentials
}