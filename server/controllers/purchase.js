const Purchase = require('../models/purchase');
const Item = require('../models/item');

function updateItemStock(itemId, qty) {

    Item.findOne({ _id: itemId } , function(err, item) {
        if (err) { console.error("err", err);}
        const totalUpdate = item.uomCount * qty;

        Item.update({_id: itemId}, { $inc: {stock: totalUpdate} }, function(err) {
            if (err) { console.error("err", err);}
        });
    });
}

exports.createPurchase = function(req, res, next) {
    const purchase = new Purchase({
        companyId: req.headers.companyid,
        officeId: req.headers.officeid,
        billNo: req.body.billNo,
        billDate: req.body.billDate,
        supplierId: req.body.supplierId,
        notes: req.body.notes,
        created: new Date().now,
        total: req.body.amount,
        items: req.body.items 
    });

    purchase.save(function(err){
        if (err) { return next(err); }
        //next();
        purchase.items.forEach(function(item) {  
            updateItemStock(item.itemId, item.qty);
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(purchase);
    });
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Purchase.find({
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]
    }, {}, { sort : {created: -1} }, function(err, purchases){
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

exports.getByDate = function(req, res, next) {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Purchase.find({ 
        $and: [
            { companyId: companyId },
            { officeId: officeId },
            { billDate: {
                $gte: fromDate,
                $lte: toDate
            }}
        ] }, {}, { sort : {created: -1} }, function(err, purchases){
        

        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(purchases);
    });
};