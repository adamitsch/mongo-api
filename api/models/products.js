var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name : {type: String},
    price : {type: Number},
    available: {type: Boolean},
    dateCreated: {type: Date, default: Date.now()}
});

module.exports = productSchema;
mongoose.model('Product', productSchema, 'Products');