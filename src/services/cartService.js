const cart = require('../models/cart.js');

const addItemCart = async(id, quantity, poc) => {
    return cart.addProduct(id,quantity);
}

const getItems = async(id) => {
    return cart.getItems(id);
};

const getTotal = async(id) => {
    return cart.getTotal(id);
};

const removeById = async (idOwner, idDetail) => {
    cart.removeById(idOwner,idDetail)
};

const getLicence = async (id) => {
    cart.getLicence(id)
};

module.exports = {
    addItemCart,
    getItems,
    getTotal,
    removeById,
    getLicence,
}