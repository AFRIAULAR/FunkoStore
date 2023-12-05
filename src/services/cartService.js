const cart = require('../models/cart');

const addItemCart = async(id, quantity, poc) => {
    return cart.addProduct(id,quantity);
}

module.exports = {
    addItemCart
}