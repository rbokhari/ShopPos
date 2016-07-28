const Item = require('../models/item');

exports.createItem = function(req, res, next) {
    
    const code = req.body.code;
    const name = req.body.name;
    const desc = req.body.description;
    const stock = 0;
    const status = req.body.status;

    //return res.status(422).send({ error: req.headers.companyid});

    if (!req.body.companyId){
        return res.status(422).send({ error: 'Company is not passed'});
    }

    if (!req.body.officeId){
        return res.status(422).send({ error: 'office is not passed'});
    }

    // check if item code is already assigned
    Item.findOne( { code: code }, function(err, existingItem) {
        if (err) { return next(err); }

        if (existingItem) {
            return res.status(422).send({ error: 'Code is in use !'});
        }

        const item = new Item({
            companyId: req.body.companyId,
            officeId: req.body.officeId,
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
    Item.find({}, function(err, items){
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