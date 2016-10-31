const Day = require('../models/day');

exports.createDay = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Day.findOne( { $and: [ { status: 0 }, { companyId: companyId }, { officeId: officeId }] }, function(err, existingDay) {
        if (err) { return next(err); }

        if (existingDay) {
            return res.status(422).send({ error: 'Day already open !'});
        }

        const day = new Day({
            today: new Date().now,
            close: null,
            status: 0,
            companyId: companyId,
            officeId: officeId
        });

        day.save(function(err){
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            res.json(day);
        });
    });

};

exports.closeDay = function(req, res) {
    //res.json('Got a PUT request at category');
    const id = req.body._id;
    const today = req.body.today;
    const close = req.body.close;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Day.update( { $and: [ 
                            { _id: id } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { status: status }, 
                        function(err, existing) {

        if (err) { return next(err); }
        res.send('Day Closed');
    });

};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Day.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]}, function(err, days){
            
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(days);
    });
};

exports.getById = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Day.find({ 
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

exports.getOpenDay = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    
    Day.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    { status: 0 }
                ]}, function(err, day){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(day);
    });
};