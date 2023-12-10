const cart = require('../models/cart');

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
}

module.exports = {
    addItemCart,
    getItems,
    getTotal,
    removeById
}