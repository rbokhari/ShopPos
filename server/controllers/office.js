const Office = require('../models/office');

exports.createOffice = function(req, res, next) {
    console.log('--------------');
    console.log(req.headers);
    const code = '001';
    const name = 'Al Khud Branch';
    const displayName = 'Al Khud';
    const location = 'Al Khud';
    const officeNo = '2424524';
    const mobileNo = '958774';
    const companyId = req.headers.companyid;
    const status = 1;

    // check if Office code is already assigned
    Office.findOne( { code: code }, function(err, existing) {
        if (err) { return next(err); }
        if (existing) {
            return res.status(422).send({ error: 'Code is in use !'});
        }
        const office = new Office({
            code: code,
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
    Office.find({}, function(err, offices){
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