var fs = require('fs');
var Excel = require('exceljs');
var moment = require('moment');
//var path = require('path');

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

exports.closeDay = function(req, res, next) {
    //res.json('Got a PUT request at category');
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const dayId = req.headers.dayid;
    const newDate = new Date();

    // var transporter = nodemailer.createTransport({
    //     service: 'Mailgun',
    //     auth: {
    //         user: 've@sandboxa84861bac0ef49d3bb4d4ced38598d4d.mailgun.org',
    //         pass: 'admin@123',
    //         api_key: 'key-9333924d333a09ad793bc761f45c1a73',
    //         domain: 'sandbox3249234.mailgun.org'
    //     }
    // });
 
    //     // setup e-mail data with unicode symbols 
    //     var mailOptions = {
    //         from: '"Fred Foo " <rbokhari@gmail.com>', // sender address 
    //         to: 'rahman_naveed@hotmail.com', // list of receivers 
    //         subject: 'Hello ', // Subject line 
    //         text: 'Hello world', // plaintext body 
    //         html: '<b>Hello world</b>' // html body 
    //     };
        
    //     // send mail with defined transport object 
    //     transporter.sendMail(mailOptions, function(error, info){
    //         if(error){
    //             return console.log(error);
    //         }
    //         console.log('Message sent: ' + info.response);
    //     });

    //     res.send('Day close');

    Day.update( { $and: [ 
                            { _id: dayId } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { status: 1, close: newDate }, 
                        function(err, existing) {

        if (err) { 
            console.log(err);
            return next(err); 
        }
        next();
        res.send('Day close');
    });
};

exports.printCloseDay = function(req, res, next) {
    const dayId = req.headers.dayid;
    var wstream = fs.createWriteStream('pdf/' + dayId + '.cld');    // take this extension in service to get proper report print
    wstream.end();
    next();
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
    
    if (companyId != '0' && officeId != '0') {
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
    } else {
        res.json({});
    }
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

exports.getExcelBetweenDates = function(req, res, next) {

    var startDay = new Date(2017, 0, 10);
    var endDay = new Date(2017, 1, 10);
    var oneDay = 1000 * 60 * 60 * 24;

    var workbook = new Excel.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    // Set workbook dates to 1904 date system 
    workbook.properties.date1904 = true;

    var worksheet = workbook.addWorksheet('Export Sheet');
    //worksheet.mergeCells('A1:B2');
    // worksheet.getCell('A1').value = 'I am merged';
    // worksheet.getCell('C1').value = 'I am not';
    // worksheet.getCell('C2').value = 'Neither am I';
    //worksheet.getRow(2).commit(); // now rows 1 and two are committed. 

    //var startCol = worksheet.getColumn('C');

    var totalDays = Math.round((endDay - startDay)/oneDay);
    var dateHeader = startDay;
    var colDate = worksheet.getColumn(1);
    colDate.header = 'Date'; 
    for (i = 1; i< totalDays; i++ ){
        var col = worksheet.getColumn(i+1);
        col.dataValidation = {
            type: 'date',
            allowBlank: true
        };
        //col.header = new Date(dateHeader.setDate(startDay.getDate() + i));
        col.header = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('DD-MMM-YYYY') ;
    }
    worksheet.addRow();
    var row = worksheet.getRow(2);
    row.getCell(1).value = 'Day';
    dateHeader = startDay;
    for (i = 1; i< totalDays; i++ ){
        row.getCell(i+1).value = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('dddd') ;
    }

    row = worksheet.getRow(3);
    row.getCell(1).value = 'Morning Sale';
    row = worksheet.getRow(4);
    row.getCell(1).value = 'Evening Sale';
    row = worksheet.getRow(5);
    row.getCell(1).value = 'Total Sale';
    row = worksheet.getRow(6);
    row.getCell(1).value = 'Net';
    row = worksheet.getRow(7);
    row.getCell(1).value = 'Total of Expanses';

    // fetching days ID from 
    Day.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    { today: {
                        $gte: startDay,
                        $lte: closeDay
                    }}
                ] }, { _id: 1 }, function(err, days){

        if (err) { return next(err); }
        days = days.map(function(day,index){
            return day._id;
        });

        if (days.length > 0) {        
            Customer.find({ 
                $and: [
                    { companyId: companyId },
                    { officeId: officeId },
                    { status: 3 },
                    { dayId: { $in: days }}
                ] }, {}, { sort : {created: -1} }, function(err, customers){
                
                if (err) { return next(err); }

                
            });
        }
    });



    workbook.xlsx.writeFile('excel/excel.xlsx')
    .then(function() {
        // done 
        //res.setHeader('Content-Type', 'application/json');
        //res.sendFile('./excel/excel.xlsx');
        res.json({'done': Math.round((endDay - startDay)/oneDay)});
        next();
    });
};