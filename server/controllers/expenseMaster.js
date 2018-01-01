const ExpenseMaster = require('../models/expenseMaster');

exports.create = function(req, res, next) {
    
    //const code = req.body.name;
    const created = new Date().now;
    const description = req.body.description;
    const name = req.body.name;

    const expenseMaster = new ExpenseMaster({
        created: created,
        description: description,
        name: name
    });

    expenseMaster.save(function(err){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(expenseMaster);
    });
};

exports.update = function(req, res, next) {
    //res.json('Got a PUT request at category');
    const id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;

    ExpenseMaster.update({ _id: id }, { description: descrption, name: name }, function(err, existingItem) {
        if (err) { return next(err); }
        res.send('Done Expense Master Update');
    });
};

exports.getAll = function(req, res, next) {
    ExpenseMaster.find({}, {}, { sort: { name: 1} }, function(err, expenseMasters){
            
        if (err) { return next(err);     }
        res.setHeader('Content-Type', 'application/json');
        res.json(expenseMasters);
    });
};

exports.getById = function(req, res, next) {
    ExpenseMaster.find({ _id: req.params.id }, function(err, expenseMaster){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(expenseMaster);
    });
};
