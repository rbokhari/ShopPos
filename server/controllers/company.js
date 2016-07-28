const Company = require('../models/company');

exports.createCompany = function(req, res, next) {
    const code = '001';
    const name = 'Coffee Shop';
    const displayName = 'My Shop';
    const location = 'Al Khud';
    const status = 1;

    // check if Company code is already assigned
    Company.findOne( { code: code }, function(err, existingCompany) {
        if (err) { return next(err); }

        if (existingCompany) {
            return res.status(422).send({ error: 'Code is in use !'});
        }

        const company = new Company({
            code: code,
            name: name,
            displayName: displayName,
            location: location,
            status: status
        });

        company.save(function(err){
            if (err) { return next(err); }
            // respond to request indicating the Company was created
            res.setHeader('Content-Type', 'application/json');
            res.json(company);
        });
    });

};

exports.updateCompany = function(req, res) {
    res.json('Got a PUT request at company');

    // const name = req.body.name;
    // const status = req.body.status;

    // res.json(name);
//     Category.findOne( { name: name }, function(err, existingName) {
//         if (err) { return next(err); }

//         if (existingName) {
//             return res.status(422).send({ error: 'Name is in defined !'});
//         }

//         const category = new Category({
//             name: name,
//             status: status
//         });
// res.json(category);
        // category.findOneAndUpdate( {_id: req.params.id} ,  function(err, category){ 
        //     if (err) { return next(err); }

        //     res.json(category);
        // });
//    });

};

exports.getAll = function(req, res, next) {
    Company.find({}, function(err, companies){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(companies);
    });
};

exports.getById = function(req, res, next) {
    Company.find({ _id: req.params.id }, function(err, company){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(company);
    });
};
