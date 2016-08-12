const jwt = require('jwt-simple');
const User = require('../models/user');
const Company = require('../models/company');
const config = require('../config');


function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);     // sub = subject, iat = issue at time
}

exports.signin = function(req, res, next) {
    // user already authenticated, just give token now
    res.send( { token: tokenForUser(req.user) });
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
                    companyId: company._id
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
