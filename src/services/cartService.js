const cart = require('../models/cart');

const addItemCart = async(id, quantity, owner) => {
    return cart.addProduct(id,quantity,owner);
}

const getItems = async(id,owner) => {
    return cart.getItems(id,owner);
};

const getTotal = async(id) => {
    return cart.getTotal(id);
};

const removeById = async (idOwner, idDetail) => {
    cart.removeById(idOwner,idDetail)
};

const payItems = async(idOwner) => {
    cart.payItems(idOwner);
};

module.exports = {
    addItemCart,
    getItems,
    getTotal,
    removeById,
    payItems
}