var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products');

router.get('/products', ctrlProducts.getAllProducts);
router.post('/product', ctrlProducts.addProduct);
router.get('/product/:id', ctrlProducts.getProduct);
router.delete('/product/:id', ctrlProducts.removeProduct);
router.put('/product', ctrlProducts.editProduct);

module.exports = router;