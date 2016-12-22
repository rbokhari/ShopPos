const Day = require('../models/day');
const nodemailer = require('nodemailer');

exports.createDay = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Day.findOne( { $and: [ { status: 0 }, { companyId: companyId }, { officeId: officeId }] }, function(err, existingDay) {
        if (err) { return next(err); }

        if (existingDay) {
            return res.status(422).send({ error: 'Day already open !'});
        }

        Day.count({ $and: [ { companyId: companyId} , { officeId: officeId } ] }, function(err, cn){
            if (err) { return next(err); }

            console.log("cn", cn);

            const day = new Day({
                _id: cn+1,
                today: new Date().now,
                close: null,
                status: 0,
                companyId: companyId,
                officeId: officeId
            });

            console.log("new day", day);

            day.save(function(err){
                if (err) { return next(err); }

                res.setHeader('Content-Type', 'application/json');
                res.json(day);
            });

        });
    });
};

exports.closeDay = function(req, res) {
    //res.json('Got a PUT request at category');
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const dayId = req.headers.dayid;
    const newDate = new Date();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rbokhari@gmail.com',
            pass: ''
        }
    });

        
        // setup e-mail data with unicode symbols 
        var mailOptions = {
            from: '"Fred Foo " <rbokhari@gmail.com>', // sender address 
            to: 'rahman_naveed@hotmail.com', // list of receivers 
            subject: 'Hello ', // Subject line 
            text: 'Hello world', // plaintext body 
            html: '<b>Hello world</b>' // html body 
        };
        
        // send mail with defined transport object 
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        res.send('Day close');

    // Day.update( { $and: [ 
    //                         { _id: dayId } , 
    //                         { companyId: companyId }, 
    //                         { officeId: officeId }
    //                     ] }, 
    //                 { status: 1, close: newDate }, 
    //                     function(err, existing) {

    //     if (err) { 
    //         console.log(err);
    //         return next(err); 
    //     }

    //     // send email here
    //     var transporter = nodemailer.createTransport('smtps://rbokhari@gmail.com:pass@smtp.gmail.com');
        
    //     // setup e-mail data with unicode symbols 
    //     var mailOptions = {
    //         from: '"Fred Foo 👥" <rbokhari@gmail.com>', // sender address 
    //         to: 'rbokhari@gmail.com', // list of receivers 
    //         subject: 'Hello ✔', // Subject line 
    //         text: 'Hello world 🐴', // plaintext body 
    //         html: '<b>Hello world 🐴</b>' // html body 
    //     };
        
    //     // send mail with defined transport object 
    //     transporter.sendMail(mailOptions, function(error, info){
    //         if(error){
    //             return console.log(error);
    //         }
    //         console.log('Message sent: ' + info.response);
    //     });

    //     res.send('Day close');
    // });
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
    
    Day.findOne({ 
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

exports.getDayBetweenDates = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);

    Day.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    { created: {
                        $gte: fromDate,
                        $lte: toDate
                    }}
                ]}, function(err, days){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(days);
    });
};