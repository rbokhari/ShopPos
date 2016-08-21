const Customer = require('../models/customer');

exports.createCustomer = function(req, res, next) {
    const customer = new Customer({
        companyId: req.headers.companyid,
        officeId: req.headers.officeid,
        carNumber: req.body.carNumber,
        mobileNumber: req.body.mobileNumber,
        products: req.body.products,
        created: new Date().now,
        status: req.body.status 
    });

    customer.save(function(err){
        if (err) { return next(err); }
        next();
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    });
};

exports.updateCustomer = function(req, res, next) {
    Customer.update({_id: req.params.id}, { status: req.params.newStatus }, { multi: false }, function(err, numAffected) {
        if (err) { return next(err); }
        next();
        res.json(req.body);
    });
    // Customer.findById( req.params.id, function(err, doc) {
    //     doc.status = 1;
    //     doc.save(function(err){
    //         if (err) console.log(err)
    //         else console.log("success");
    //         res.json("done");
    //     });
    // });
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.header.officeid;
    
    Customer.find({
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]
    }, function(err, customers){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    });
};

exports.getAllByStatus = function(req, res, next) {
    const status = req.params.status;   // e.g. 0 = issue, 1 = Kitchen finished, 2 = devliered
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Customer.find({ 
        $and: [
            {companyId: companyId},
            {officeId: officeId },
            { $or: [{status: 0}, {status: 1}, {status: 2}] }
        ] }, {}, { sort : {created: 1} }, function(err, customers){
        

        if (err) { return next(err); }
        next();
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    });
};

exports.getById = function(req, res, next) {
    console.log("unnessary load , check this");
    // Customer.find({ _id: req.params.id }, function(err, customer){
    //     if (err) { return next(err); }

    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(customer);
    // });
};