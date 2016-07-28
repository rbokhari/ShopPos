const Customer = require('../models/customer');

exports.createCustomer = function(req, res, next) {
    const customer = new Customer({
        companyId: req.body.companyId,
        officeId: req.body.officeId,
        carNumber: req.body.carNumber,
        mobileNumber: req.body.mobileNumber,
        products: req.body.products,
        created: new Date().now,
        status: req.body.status 
    });

    customer.save(function(err){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    });
};

exports.updateCustomer = function(req, res) {
    //console.log(req.body);
    const customer = new Customer( req.body );
    customer.update({_id: req.params.id}, { status: 1 }, { multi: false }, function(err, numAffected) {
        if (err) { return next(err); }
        res.json('Got a PUT request at customer ' + numAffected);
    });
};

exports.getAll = function(req, res, next) {
    Customer.find({}, function(err, customers){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    });
};

exports.getAllByStatus = function(req, res, next) {
    const status = req.params.status;   // e.g. 0 = issue, 1 = Kitchen finished, 2 = devliered
    Customer.find({ $or: [{status: 0}, {status: 1}] }, function(err, customers){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    });
};

exports.getById = function(req, res, next) {
    Customer.find({ _id: req.params.id }, function(err, customer){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    });
};