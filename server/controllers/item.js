const Item = require('../models/item');

exports.createItem = function(req, res, next) {
    
    const code = req.body.code;
    const name = req.body.name;
    const desc = req.body.description;
    const uom = req.body.uom;
    const uomCount = req.body.uomCount;
    const stock = 0;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    //return res.status(422).send({ error: req.headers.companyid});

    if (!companyId){
        return res.status(422).send({ error: 'Company is not passed'});
    }

    if (!officeId){
        return res.status(422).send({ error: 'office is not passed'});
    }

    // check if item code is already assigned

    Item.findOne( { 
            $and: [
                { name: name }, 
                { companyId: companyId }, 
                { officeId: officeId }
            ] }, function(err, existingItem) {

        if (err) { return next(err); }

        if (existingItem) {
            return res.status(422).send({ error: 'Name is already defined !'});
        }
        Item.count({}, function(err, cn){
            if (err) { return next(err); }
            const item = new Item({
                companyId: companyId,
                officeId: officeId,
                code: cn + 1,
                name: name,
                uom: uom,
                uomCount: uomCount,
                description: desc,
                stock: stock,
                status: status
            });
            item.save(function(err){
                if (err) { return next(err); }
                // respond to request indicating the item was created
                res.json(item);
            });
        });
    });
};

exports.updateItem = function(req, res) {
    const id = req.body._id;
    const code = req.body.code;
    const name = req.body.name;
    const desc = req.body.description;
    const uom = req.body.uom;
    const uomCount = req.body.uomCount;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Item.update( { $and: [ { _id: id } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { code: code, name: name, uom: uom, uomCount: uomCount, description: desc, status: status }, 
                    function(err, existingItem) {

        if (err) { return next(err); }
        res.send('Done Item Update');
    });
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Item.find({
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]
    }, function(err, items){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    });
};

exports.getById = function(req, res, next) {
    Item.find({ _id: req.params.id }, function(err, item){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(item);
    });
};