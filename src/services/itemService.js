const items = require('../models/items');

const getItems = async (params) => {
    return items.getItems(params);
};

module.exports = {
    getItems
}