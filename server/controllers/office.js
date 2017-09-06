const Office = require('../models/office');

exports.createOffice = function(req, res, next) {
    const name = req.body.name;
    const displayName = req.body.displayName;
    const location = req.body.location;
    const officeNo = req.body.officeNo;
    const mobileNo = req.body.mobileNo;
    const companyId = req.headers.companyid;
    const status = 1;

    // check if Office code is already assigned
    Office.findOne( { name: name }, function(err, existing) {
        if (err) { return next(err); }
        if (existing) {
            return res.status(422).send({ error: 'Code is in use !'});
        }
        const office = new Office({
            name: name,
            displayName: displayName,
            location: location,
            officeNo: officeNo,
            mobileNo: mobileNo,
            companyId: companyId,
            status: status
        });

        office.save(function(err){
            if (err) { return next(err); }

            // respond to request indicating the Office was created
            res.json(office);
        });
    });
};

exports.deactivateAll = function(req, res, next) {
    Office.update({}, { $set: { isActive: 0} }, {multi: true}, function(err, existing) {
        if (err) { return next(err); }
        next();
    });
};

exports.activateOne = function(req, res, next) {
    Office.findByIdAndUpdate( req.params.id , { $set: { isActive: 1} }, function(err, branch) {
        if (err) { return next(err); }

        res.json(branch);
    });
};


exports.updateOffice = function(req, res) {
    res.json('Got a PUT request at office');

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
    const companyId = req.headers.companyid;
    Office.find({companyId: companyId}, function(err, offices){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(offices);
    });
};

exports.getById = function(req, res, next) {
    Office.findOne({ _id: req.params.id }, function(err, office){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(office);
    });
};