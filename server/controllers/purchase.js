const Purchase = require('../models/purchase');
const Item = require('../models/item');

exports.createPurchase = function(req, res, next) {
    const purchase = new Purchase({
        companyId: req.headers.companyid,
        officeId: req.headers.officeid,
        billNo: req.body.billNo,
        billDate: req.body.billDate,
        notes: req.body.notes,
        created: new Date().now,
        total: 10,
        items: req.body.items 
    });

    purchase.save(function(err){
        if (err) { return next(err); }
        //next();
        purchase.items.forEach(function(item) {  
            console.log("item", item); 
            updateItemStock(item.itemId, item.qty);
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(purchase);
    });
};

exports.getAll = function(req, res, next) {
    Purchase.find({}, {}, { sort : {created: -1} }, function(err, purchases){
        if (err) { return next(err); }
        // const data = purchases.map(purchase => {

        // });
        res.setHeader('Content-Type', 'application/json');
        res.json(purchases);
    });
};

exports.getAllByItemId = function(req, res, next) {
    const id = req.params.id;
    Purchase.find({ "items.itemId" : id }, {}, { sort : {created: 1} }, function(err, purchases){
        if (err) { return next(err); }
        next();
        res.setHeader('Content-Type', 'application/json');
        res.json(purchases);
    });
};

exports.getById = function(req, res, next) {
    Purchase.find({ _id: req.params.id }, function(err, purchase){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(purchase);
    });
};