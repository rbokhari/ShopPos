const Category = require('../models/category');

exports.createCategory = function(req, res, next) {
    const name = req.body.name;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Category.findOne( { $and: [ { name: name }, { companyId: companyId }, { officeId: officeId }] }, function(err, existingName) {
        if (err) { return next(err); }

        if (existingName) {
            return res.status(422).send({ error: 'Name is in defined !'});
        }

        const category = new Category({
            name: name,
            status: status,
            companyId: companyId,
            officeId: officeId
        });

        category.save(function(err){
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            res.json(category);
        });
    });

};

exports.updateCategory = function(req, res) {
    //res.json('Got a PUT request at category');
    const id = req.body._id;
    const name = req.body.name;
    const status = req.body.status;
    const description = req.body.description;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Category.update( { $and: [ { _id: id } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { name: name, status: status }, 
                        function(err, existingItem) {

        if (err) { return next(err); }
        res.send('Done Category Update');
    });


};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Category.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]}, function(err, categories){
            
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    });
};

exports.getById = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Category.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    {_id: req.params.id}
                ]}, function(err, category){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(category);
    });
};