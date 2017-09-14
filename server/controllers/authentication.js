var async = require('async');
const jwt = require('jwt-simple');
const User = require('../models/user');
const Company = require('../models/company');
const Office = require('../models/office');
const config = require('../config');
const CONSTANT = require('../../shared/constants1');


function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);     // sub = subject, iat = issue at time
}

exports.signin = function(req, res, next) {
    // user already authenticated, just give token now
    // const user = {
    //     id: req.user._id,
    //     name: req.user.email,
    //     roleId: req.user.roleId,
    //     branchId: req.user.officeId,
    //     companyId: req.user.companyId,
    //     status: req.user.status
    // };
    const user = req.user;
    var result = {
        userId: user._id,
        name: user.email,
        roleId: user.roleId,
        companyId: user.companyId,
        officeId: user.officeId ? user.officeId : 0
    };
    if (user) {
        if (user.companyId) {
            Company.findById(user.companyId, function(err, company) {
                if (err) { return next(err); }
                if (company) {
                    //result = { ...result, { companyName: company.name, companyDisplay: company.displayName }  } ;
                    result = Object.assign({}, result, { company: { companyId: company._id, name: company.name, displayName: company.displayName} });

                    if (result.officeId && result.officeId !== 0) {
                        Office.findById(result.officeId, function(err, branch) {
                            if (err) { return next(err); }
                            if (branch) {
                                result = Object.assign({}, 
                                    result, 
                                    { 
                                        branch: [
                                            { 
                                                branchId: branch._id,
                                                name: branch.name, 
                                                display: branch.displayName, 
                                                office: branch.officeNo, 
                                                mobile: branch.mobileNo,
                                                isActive: branch.isActive
                                            }
                                        ] ,
                                        officeId: branch._id
                                    });
                                //res.send({ user: result });
                                res.send( { token: tokenForUser(user), user: result });
                            }
                        });
                    }else {
                        if (user.roleId === CONSTANT.USER_ROLE.ADMIN) {
                            
                            Office.find({companyId: user.companyId}, function(err, existingBranches) {
                                if (err) { return next(err); }
                                if (existingBranches && existingBranches.length > 0) {
                                    const branches = existingBranches.map(function(branch, i){
                                        return {
                                            branchId: branch._id,
                                            name: branch.name,
                                            display: branch.display,
                                            office: branch.officeNo,
                                            mobile: branch.mobileNo,
                                            isActive: branch.isActive
                                        }; 
                                    });
                                    
                                    result = Object.assign({}, result, { branch: branches, officeId: branches[0].branchId });
                                    //res.send( { user: result });
                                    res.send( { token: tokenForUser(user), user: result });
                                } else {
                                    res.send( { token: tokenForUser(user), user: result });
                                }
                            });
                        }else {
                            res.send( { token: tokenForUser(user), user: result });
                        }
                    }
                }
            });
        }
    }
    
};

exports.user = function(req, res, next) {
    const user = req.user;
    var result = {
        userId: user._id,
        name: user.email,
        roleId: user.roleId,
        status: user.status,
        companyId: user.companyId,
        officeId: user.officeId ? user.officeId : 0
    };
    if (user) {
        var queries = [];
        if (user.companyId) {
            queries.push(function(cb) {
                Company.findById(user.companyId, function(err,company) {
                    if (err) { cb(err); }
                    
                    cb(null, company);
                });
            });
        }
        if (user.officeId) {
            queries.push(function(cb) {
                Office.findById(user.officeId, function(err, branch) {
                    if (err) { cb(err); }
                    
                    cb(null, branch);
                });
            });
        }else {
            queries.push(function(cb) {
                Office.find({companyId: user.companyId}, function(err, existingBranches) {
                    if (err) { cb(err); }
                    
                    cb(null, existingBranches);
                });
            });
        }
        async.parallel(queries, function(err, docs) {
            if (err) { return next(err); }
            const result1 = docs[0];
            const result2 = docs[1];
            console.log('result2', result2);
            //const branch = JSON.get(result2);
            result = Object.assign({}, result, { 
                company: { companyId: result1._id, name: result1.name, displayName: result1.displayName}
            });
            //console.log('instanceof', resu)
            if (result2.length > 0) {
                if (result2 instanceof Array) {
                    const branches = result2.map(function(branch, i){
                        return {
                            branchId: branch._id,
                            name: branch.name,
                            displayName: branch.displayName,
                            office: branch.officeNo,
                            mobile: branch.mobileNo,
                            isActive: branch.isActive
                        }; 
                    });
                    result = Object.assign({}, result, { branch: branches, officeId: branches[0].branchId });
                } else {
                    result = Object.assign({}, result, { 
                        branch: { branchId: result2._id, name: result2.name, displayName: result2.displayName, office: result2.officeNo, mobile: result2.mobileNo} 
                    });
                }
            }
            res.send( { user: result });
        });


        // if (user.companyId) {
        //     Company.findById(user.companyId, function(err,company) {
        //         console.log('start 2'); 
        //         if (company) {
        //             //result = { ...result, { companyName: company.name, companyDisplay: company.displayName }  } ;
        //             result = Object.assign({}, result, { company: { companyId: company._id, name: company.name, displayName: company.displayName} });

        //             if (user.officeId) {
        //                 console.log('start 3'); 
        //                 Office.findById(user.officeId, function(err, branch) {
        //                     if (err) { return next(err); }
        //                     if (branch) {
        //                         result = Object.assign({}, result, { branch: { branchId: branch._id, name: branch.name, displayName: branch.displayName, office: branch.officeNo, mobile: branch.mobileNo} });
        //                         res.send({ user: result });
        //                     }
        //                 });
        //             }else {
        //                 console.log('start 4'); 
        //                 if (user.roleId == CONSTANT.USER_ROLE.ADMIN) {
        //                     console.log('start 5 ' + user.companyId); 
        //                     Office.find({companyId: user.companyId}, function(err, existingBranches) {
        //                         console.log('office error : '); 
        //                         if (err) { return next(err); }
        //                         console.log('start 6'); 
        //                         if (existingBranches) {
        //                             const branches = existingBranches.map(function(branch, i){
        //                                 return {
        //                                     branchId: branch._id,
        //                                     name: branch.name,
        //                                     displayName: branch.displayName,
        //                                     office: branch.officeNo,
        //                                     mobile: branch.mobileNo,
        //                                     isActive: branch.isActive
        //                                 }; 
        //                             });
        //                             // const active = {
        //                             //             branchId: branches[0].branchId,
        //                             //             name: branches[0].name,
        //                             //             displayName: branches[0].displayName,
        //                             //             office: branches[0].officeNo,
        //                             //             mobile: branches[0].mobileNo,
        //                             //             isActive: branches[0].isActive
        //                             //         };
        //                             //branches
        //                                                 // .filter(function(branch, i) {
        //                                                 //     return branch.isActive === 1;
        //                                                 // })
        //                                                 // .map(function(branch, i) {
        //                                                 //     return {
        //                                                 //         branchId: branch.branchId,
        //                                                 //         name: branch.name,
        //                                                 //         displayName: branch.displayName,
        //                                                 //         office: branch.officeNo,
        //                                                 //         mobile: branch.mobileNo,
        //                                                 //         isActive: branch.isActive
        //                                                 //     };
        //                                                 // });
        //                             result = Object.assign({}, result, { branch: branches, officeId: branches[0].branchId });
        //                             //res.send( { user: result });
        //                             console.log('start 7'); 
        //                             res.send( { user: result });
        //                         }
        //                     });
        //                 }else {
        //                     console.log('start 8'); 
        //                     res.send({ user: result });
        //                 }
        //                 console.log('start 10'); 
        //             }
        //             console.log('start 11'); 
        //         }
        //         console.log('start 12'); 
        //     });
        // }
    }
    //res.send( {user: req.user });
};


exports.createAccount = function(req, res, next) {
    
    // see if a user with given user exists
    const name = req.body.name;
    const displayName = req.body.displayName;
    const location = req.body.location;
    const contactNo = req.body.contactNo;

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'Request required body are missing !'});
    }

    Company.findOne({name: name}, function(err, existingCompany){
        if (err) { return next(err); }

        if (existingCompany) {
            //return res.status(422).json({ error: 'Company name already exists '});
            return res.status(422).send({ error: 'Company name already exists '});
            //return res.status(422).send('Company name already exists ');
        }

        const company = new Company({
            name: name,
            displayName: displayName,
            location: location,
            contactNo: contactNo,
            status: 1
        });

        company.save(function(err) {
            if (err) { return next(err); }

            User.findOne({email: email }, function(err, existingUser) {
                if (err) { return next(err); }

                if (existingUser) {
                    return res.status(422).send({ error: 'User already exists !' });     //422 = not 
                }

                const user = new User({
                    email: email,
                    password: password,
                    companyId: company._id,
                    roleId: CONSTANT.USER_ROLE.ADMIN,
                    status: 1
                });

                user.save(function(err) {
                    if (err) { return next(err); }

                    // success save new user
                    res.json( { 
                        companyId: company._id, 
                        token: tokenForUser(user) 
                    });
                });
            });

        });

    });
};

exports.signup = function(req, res, next) {
    
    // see if a user with given user exists
    const email = req.body.email;
    const password = req.body.password;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    if (!companyId || !officeId) {
        return res.status(422).send({ error: 'Request required headers are missing !'});
    }

    if (!email || !password) {
        return res.status(422).send({ error: 'Request required body are missing !'});
    }

    // search in db
    User.findOne({email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'User already exists !'});     //422 = not 
        }

        const user = new User({
            email: email,
            password: password,
            companyId: companyId,
            officeId: officeId
        });

        user.save(function(err) {
            if (err) { return next(err); }

            // success save new user
            res.json( { token: tokenForUser(user) });
        });
    });
};

