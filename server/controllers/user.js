const User = require('../models/user');
const Branch = require('../models/office');

exports.createUser = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const roleId = req.body.roleId;
    const companyId = req.headers.companyid;
    const officeId = req.body.branchId;
    const status = req.body.status;

    User.findOne( { $and: [ { email: email }, { companyId: companyId }] }, function(err, existingName) {
        if (err) { return next(err); }

        if (existingName) {
            return res.status(422).send({ error: 'Name is in defined !'});
        }

        const user = new User({
            email: email,
            password: password,
            companyId: companyId,
            officeId: officeId,
            roleId: roleId,
            status: status
        });

        user.save(function(err){
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            const saveUser = {
                id: user._id,
                email: user.email,
                roleId: user.roleId
            }
            res.json(saveUser);
        });
    });

};

exports.updateUser = function(req, res) {
    res.json('Got a PUT request at category');
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    User.find({ 
        $and: [ 
            { companyId: companyId } 
        ]}, function(err, users){
            
            if (err) { return next(err); }

            Branch.find({}, function(err, branches) {
                if (err) { return next(err); }

                res.setHeader('Content-Type', 'application/json');
                const sendUsers = users.map(function(user, i) {
                    return {
                        id: user._id,
                        email: user.email,
                        roleId: user.roleId,
                        status: user.status,
                        branch: branches.filter(function(branch, i) { 
                            return branch._id.equals(user.officeId);
                        })[0]
                    };
                });
                res.json(sendUsers);
            });            
    });
};

exports.getById = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    User.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    {_id: req.params.id}
                ]}, function(err, user){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        const sendUser = {
            id: user[0]._id,
            email: user[0].email,
            roleId: user[0].roleId
        };
        res.json(user);
    });
};