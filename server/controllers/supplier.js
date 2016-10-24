const Supplier = require('../models/supplier');

exports.createSupplier = function(req, res, next) {
    const name = req.body.name;
    const person = req.body.person;
    const contact = req.body.contact;
    const description = req.body.description;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Supplier.findOne( { $and: [ { name: name }, { companyId: companyId }, { officeId: officeId }] }, function(err, existingName) {
        if (err) { return next(err); }

        if (existingName) {
            return res.status(422).send({ error: 'Name is in defined !'});
        }

        const supplier = new Supplier({
            name: name,
            person: person,
            contact: contact,
            status: status,
            companyId: companyId,
            officeId: officeId
        });

        supplier.save(function(err){
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            res.json(supplier);
        });
    });

};

exports.updateSupplier = function(req, res) {
    const id = req.body._id;
    const name = req.body.name;
    const person = req.body.person;
    const contact = req.body.contact;
    const description = req.body.description;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Supplier.update( { $and: [ { _id: id } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { name: name, person: person, contact: contact, description: description, status: status }, 
                        function(err, existingItem) {

        if (err) { return next(err); }
        res.send('Done Supplier Update');
    });


};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Supplier.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]}, function(err, suppliers){
            
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(suppliers);
    });
};

exports.getById = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Supplier.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    {_id: req.params.id}
                ]}, function(err, supplier){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(supplier);
    });
};