const Item = require('../models/item');

exports.createItem = function(req, res, next) {
    
    const code = req.body.code;
    const name = req.body.name;
    const desc = req.body.description;
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
                { code: code }, 
                { companyId: companyId }, 
                { officeId: officeId }
            ] }, function(err, existingItem) {

        if (err) { return next(err); }

        if (existingItem) {
            return res.status(422).send({ error: 'Code is in use !'});
        }

        const item = new Item({
            companyId: companyId,
            officeId: officeId,
            code: code,
            name: name,
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

};

exports.updateItem = function(req, res) {
    res.send('Got a PUT request at /item');

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