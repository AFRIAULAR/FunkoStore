const user = require('../models/user')

const crearUsuario = async (UserInfo) =>{
    const creado = await user.crearUsuario(UserInfo);
    return creado;
};

const verificarUser = async (user_id) => {
    const verificado = await user.verificarUser(user_id);
    return verificado;
};

const getUserRole = async(user_id) => {
    const verificado = await user.getUserRole(user_id);
}

const getUserByEmail = async (email) => {
    return user_info = await user.getUserByEmail(email);
};

const registerUser = async (UserInfo) => {
    return response = await user.registerUser(UserInfo); 
};

module.exports = {
    crearUsuario,
    verificarUser,
    getUserRole,
    getUserByEmail,
    registerUser
}