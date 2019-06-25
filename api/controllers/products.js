const mongoose = require('mongoose');
var Product = mongoose.model('Product');

var sendJson = function (res, status, value){
    res.status(status);
    res.json(value);
};

module.exports.getAllProducts = function(req, res){
    Product.find().exec(function(err,products){
        if(err) { 
            res.sendStatus(500)
        } else if(products.length == 0){
            res.sendStatus(404);
        } else {
            var list = [];
            products.forEach( document => {
                list.push({
                    name: document.name,
                    price: document.price,
                    available: document.available,
                    dateCreated: document.dateCreated.toString()
                });
            });
            sendJson(res, 200, list);
        }
    });
};

module.exports.addProduct = function(req, res){
    Product.create({
        name: req.body.name,
        price: req.body.price,
        available: req.body.available
    }, function(err, product){
        if(err){
            res.sendStatus(500);
        }
        else{
            sendJson(res,201,product);
        }
    });
};

module.exports.getProduct = function(req, res){
    if(req.params && req.params.id){
        Product.findById(req.params.id, '-__v -_id')
            .exec(function(err, product){
                if(err){
                    res.sendStatus()
                }
                else{
                    //Object.assign({},product)
                    let obj = {
                        "name": product.name,
                        "price": product.price,
                        "available": product.available,
                        "dateCreated": product.dateCreated.toString()
                    };
                    sendJson(res,200,obj);
                }
            });
    }else{
        res.sendStatus(400);
    }
};

module.exports.removeProduct = function(req, res){
    var productId = req.params.id;
    if(productId){
        Product.findByIdAndDelete(productId)
            .exec(function(err, product){
                if(err){
                    res.sendStatus(500);
                } 
                else{
                    res.sendStatus(204);
                }
            });
    }
    else{
        res.sendStatus(400);
    }
};

module.exports.editProduct = function(req, res){
    //get id from the body
    var productId = req.body.id;
    if(productId){
        Product.findByIdAndUpdate(productId, req.body)
            .exec(function(err, document){
                if(err){
                    res.sendStatus(500);
                }
                else{
                    res.sendStatus(204);
                }
            });
    }
    else{
        res.sendStatus(400);
    }
};
