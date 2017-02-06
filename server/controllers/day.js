var fs = require('fs');
var Excel = require('exceljs');
var moment = require('moment');
const nodemailer = require('nodemailer');
var Q = require('q'); // We can now use promises!
//var path = require('path');

const Day = require('../models/day');
const Customer = require('../models/customer');
const Expense = require('../models/expense');


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

    Day.findOne({ '_id': dayId}, function(err, day){

        if (err) next(err);
        //console.log('day', day);
        var today = day.today;
        today.setHours(15);
        today.setMinutes(0);

        Customer.aggregate([
            { "$match": {
                "$and": [
                    { "dayId": parseInt(dayId) },
                    { "created": {
                            "$lte" : today
                        }
                    }
                ]
            }}, 
            // { "$match": {
            //     "created": {
            //         "$lte": today 
            //     }
            // }},
            {
                "$unwind": "$products"
            },
            { "$group": {
                "_id": "$dayId",
                "total": { "$sum": "$products.price"}
            }},

        ], function(err, customer) {
            console.log(customer);
            const morningTotal = customer[0].total;



            res.json({"total": morningTotal});
            next();
        });

    });



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
    //     next();
    //     res.send('Day close');
    // });
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

    var startDay = new Date(2017, 0, 1);
    var endDay = new Date(2017, 1, 1);
    var oneDay = 1000 * 60 * 60 * 24;

    var workbook = new Excel.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    // Set workbook dates to 1904 date system 
    workbook.properties.date1904 = true;

    var worksheet = workbook.addWorksheet('Summary Report', {properties:{tabColor:{argb:'FFC0000'}}, views:[{xSplit: 100, ySplit:1}]});
    //worksheet.mergeCells('A1:B2');
    // worksheet.getCell('A1').value = 'I am merged';
    // worksheet.getCell('C1').value = 'I am not';
    // worksheet.getCell('C2').value = 'Neither am I';
    //worksheet.getRow(2).commit(); // now rows 1 and two are committed. 

    //var startCol = worksheet.getColumn('C');

    var totalDays = Math.round((endDay - startDay)/oneDay);
    var dateHeader = startDay;

    //worksheet.addRow();
    var row = worksheet.getRow(1);
    worksheet.getRow(1).getCell(1).value = 'Date';
    worksheet.getRow(1).getCell(1).font = { bold: true };
    worksheet.getRow(2).getCell(1).value = 'Day';
    worksheet.getRow(2).getCell(1).font = { bold: true };
    dateHeader = startDay;
    dateHeader.setHours(0);
    dateHeader.setMinutes(0);
    //console.log("dateHeader", dateHeader, moment(dateHeader).format('dddd'));
    //dateHeader.setDate(dateHeader.getFullYear(), dateHeader.getMonth(), dateHeader.getDate(), 0,0,0);
    for (i = 0; i< totalDays; i++ ){
        worksheet.getRow(2).getCell(i+2).value = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('dddd') ;
    }
    
    worksheet.getRow(3).getCell(1).value = 'Morning Sale';
    worksheet.getRow(3).getCell(1).font = { bold: true };
    worksheet.getRow(4).getCell(1).value = 'Evening Sale';
    worksheet.getRow(4).getCell(1).font = { bold: true };
    worksheet.getRow(5).getCell(1).value = 'Total Sale';
    worksheet.getRow(5).getCell(1).font = { bold: true };
    worksheet.getRow(6).getCell(1).value = 'Net';
    worksheet.getRow(6).getCell(1).font = { bold: true };
    worksheet.getRow(7).getCell(1).value = 'Total of Expanses';
    worksheet.getRow(7).getCell(1).font = { bold: true };
    
    // fetching days ID from 
    Day.find({ 
            $and: [ 
                    // { companyId: companyId }, 
                    // { officeId: officeId }, 
                    { today: {
                        $gte: startDay,
                        $lte: endDay
                    }}
                ] }, { _id: 1, today: 1 }, function(err, days){

        if (err) { return next(err); }
        var filterDays = days.map(function(day,index){
            return day._id;
        });

        if (filterDays.length > 0) {   

            Customer.aggregate([
                { 
                    $match: {"dayId": { $in: filterDays }}
                },
                {
                    $unwind: "$products"
                },
                {
                    $group: {
                        "_id": "$dayId",
                        "total": { $sum: "$products.price" }
                    }
                }
            ], function(err, customers){
                //console.log("days", days);

                Expense.find({ 
                    $and: [
                        // { companyId: companyId },
                        // { officeId: officeId },
                        { created: {
                            $gte: startDay,
                            $lte: endDay
                        }}
                    ] }, {}, { sort : {created: 1} }, function(err, expenses){
                    

                    if (err) { return next(err); }

                    // writing expense name
                    for (i=0; i<expenses.length; i++){
                        var row = worksheet.getRow(8+i);
                        row.getCell(1).value = expenses[i].description;
                    }

                    for (i = 0; i< totalDays; i++ ){
                        var rowFormula = worksheet.getRow(7);
                        rowFormula.getCell(i+2).font = {
                            color: {argb: 'D21025'}
                        };
                        rowFormula.getCell(i+2).value = { formula: 'SUM(' + columnToLetter(i+2) + '8:'+ columnToLetter(i+2) + '15)'};
                        var col = worksheet.getColumn(i+2);
                        col.dataValidation = {
                            type: 'date',
                            allowBlank: true
                        };
                        col.header = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('DD-MMM-YYYY') ;
                        worksheet.getRow(1).getCell(i+2).font = { bold: true };
                        worksheet.getRow(2).getCell(i+2).font = { bold: true };
                        var dayNumber = new Date(dateHeader.getTime() + (86400000 * i)).getDate();
                        var monthNumber = new Date(dateHeader.getTime() + (86400000 * i)).getMonth();
                        var yearNumber = new Date(dateHeader.getTime() + (86400000 * i)).getFullYear();

                        var dayId = days.filter(function(item, index) {
                            var today = new Date(item.today);
                            return (today.getDate() === dayNumber && today.getMonth() === monthNumber && today.getFullYear() === yearNumber);
                        });

                        if (dayId.length > 0) {
                            var customerTotal = customers.filter(function(item, index) {
                                return dayId[0]["_id"] === item["_id"];
                            });
                            var row = worksheet.getRow(5);
                            //row.getCell(i+2).value = i < customers.length ? customers[i].total : 0;
                            row.getCell(i+2).value = customerTotal.length === 1 ? customerTotal[0].total : 0;
                        }

                        var expenseId = expenses.filter(function(item, index) {
                            var expenseDate = new Date(item.created);
                            return (expenseDate.getDate() === dayNumber && expenseDate.getMonth() === monthNumber && expenseDate.getFullYear() === yearNumber);
                        });
                        if (expenseId.length > 0) {
                            for (j=0; j< expenseId.length; j++) {
                                var row1 = worksheet.getRow(getRowNuber(worksheet, expenseId[j].description)); // worksheet.getRow(10 + i);
                                // row1.getCell(i+2).font = {
                                //     color: {argb: 'D21025'}
                                // };
                                row1.getCell(i+2).value = expenseId[j].amount;
                            }
                        }
                        worksheet.getRow(6).getCell(i+2).value = { formula: '(' + columnToLetter(i+2) + '5-' + columnToLetter(i+2) + '7)' };
                    }
                    worksheet.getRow(5).getCell(totalDays + 3).value = { formula: 'SUM(B5:' + columnToLetter(totalDays+1) + '5)'};
                    worksheet.getRow(6).getCell(totalDays + 3).value = { formula: 'SUM(B6:' + columnToLetter(totalDays+1) + '6)'};
                    worksheet.getRow(7).getCell(totalDays + 3).value = { formula: 'SUM(B7:' + columnToLetter(totalDays+1) + '7)'};
                    worksheet.getRow(7).getCell(totalDays + 3).font = { color: {argb: 'D21025'} };

                    var fileName = new Date().getTime() + '.xlsx';

                    workbook.xlsx.writeFile('excel/'+ fileName)
                            .then(function() {
                                // done 
                                //res.setHeader('Content-Type', 'application/json');
                                //res.sendFile('./excel/excel.xlsx');
                                console.log("excel file created");
                                //res.json({'done': Math.round((endDay - startDay)/oneDay)});
                                var file = fs.readFile('excel/' + fileName, 'binary');

                                //res.setHeader('Content-Length', file.size);
                                res.setHeader('Content-Type', 'application/xlsx');
                                res.setHeader('Content-Disposition', 'attachment; filename=ExcelFile.xlsx');
                                res.write(file, 'binary');
                                res.end();
                                next();
                            });
                });
            });
            

            // Customer.find({ 
            //     $and: [
            //         { companyId: companyId },
            //         { officeId: officeId },
            //         { status: 3 },
            //         { dayId: { $in: days }}
            //     ] }, {}, { sort : {dayId: 1} }, function(err, customers){
                
            //     if (err) { return next(err); }

            //     for (i=0; i<customers.length; i++){
            //         // var diffDate = customers[i].created;
            //         // diffDate.setDate(diffDate.getYear(), diffDate.getMonth(), diffDate.getDate(), 15, 0, 0);
            //         // if (customers[i].created <= diffDate) {

            //         // } else {

            //         // }

            //         var colDate = worksheet.getColumn(1);
            //         colDate.header = 'Date'; 
            //         for (i = 1; i< totalDays; i++ ){
            //             var col = worksheet.getColumn(i+1);
            //             col.dataValidation = {
            //                 type: 'date',
            //                 allowBlank: true
            //             };
            //             //col.header = new Date(dateHeader.setDate(startDay.getDate() + i));
            //             col.header = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('DD-MMM-YYYY') ;
            //         }
                    
            //     }

            // });
        }
    });

};

function getRowNuber(worksheet, value) {
    var index = 0;
    worksheet.eachRow(function(row, rowNumber) {
        //console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
        if (row.getCell(1).value === value) {
            index = rowNumber;
        }
    });
    return index;
}

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}