var fs = require('fs');
var Excel = require('exceljs');
var moment = require('moment');
const nodemailer = require('nodemailer');

//var Q = require('q'); // We can now use promises!
var async = require('async');
var path = require('path');
var mime = require('mime');
var request = require('request');

const Day = require('../models/day');
const Customer = require('../models/customer');
const Expense = require('../models/expense');
const Purchase = require('../models/purchase');

exports.createDay = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Day.findOne( { $and: [ { status: 0 }, { companyId: companyId }, { officeId: officeId }] }, function(err, existingDay) {
        if (err) { return next(err); }

        if (existingDay) {
            return res.status(422).send({ error: 'Day already open !'});
        }

        //Day.count({ $and: [ { companyId: companyId} , { officeId: officeId } ] }, function(err, cn){
        Day.count({  companyId: companyId }, function(err, cn){
            if (err) { return next(err); }

            const day = new Day({
                _id: cn+1,
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
    });
};

exports.closeDay = function(req, res, next) {
    //res.json('Got a PUT request at category');

    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const dayId = req.headers.dayid;
    const newDate = new Date();
    console.log(companyId, officeId);
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
        console.log('day >> ', day);
        const today = new Date(day.today);
        var morningToday = day.today;
        var close = day.close;
        var morningSale = 0;
        var eveningSale = 0;
        var netPurchases = 0;
        var netExpenses = 0;

        var queries = [];
	    queries.push(function(cb) {
            Purchase.aggregate([
                { "$match": {
                    "$and": [
                        // { "companyId": companyId },
                        // { "officeId": officeId },
                        { "created": { "$gte": today, "$lte": newDate }},
                        //{ "created": { "$lte": newDate }}
                    ]
                } },
                { "$group": {
                    "_id": dayId,
                    "total": { "$sum": "$total"}
                }}
            ], function(err, purchases) {
                if (err) { cb(err); }
                cb(null, purchases);
            });
        });
	
        queries.push(function(cb) {
            Expense.aggregate([
		{ "$match": {
                    "$and": [
                        // { "companyId": companyId },
                        // { "officeId": officeId },
                        { "created": { "$gte": today, "$lte": newDate }},
                        //{ "created": { "$lte": newDate }}
                    ]
                } },                
                { "$group": {
                    "_id": dayId,
                    "total": { "$sum": "$amount"}
                }}
            ], function(err, expenses) {
                if (err) { cb(err); }
                cb(null, expenses);
            });

        });

        morningToday.setHours(15);
        morningToday.setMinutes(0);

        // morning sale query
        queries.push(function(cb) {
            Customer.aggregate([
                { $match: {
                    $and: [
                        // { companyId: companyId },
                        // { officeId: officeId },
                        { dayId: parseInt(dayId) },
                        { created: { "$lt" : morningToday } }
                    ]
                }}, 
                {
                    $unwind: "$products"
                },
                { $group: {
                    _id: "$dayId",
                    total: { $sum: "$products.price"}
                }},
            ], function(err, morningSale) {
                if (err) { throw cb(err); }
                cb(null, morningSale);
            });
        });

        // evening sale query
        queries.push(function(cb) {
            Customer.aggregate([
                { "$match": {
                    "$and": [
                        // { "companyId": companyId },
                        // { "officeId": officeId },
                        { "dayId": parseInt(dayId) },
                        { "created": { "$gte" : morningToday } }
                    ]
                }}, 
                {
                    "$unwind": "$products"
                },
                { "$group": {
                    "_id": "$dayId",
                    "total": { "$sum": "$products.price"}
                }},
            ], function(err, eveningSale) {
                if (err) { cb(err); }
                cb(null, eveningSale);
            });
        });

        // executing all queries at once
        async.parallel(queries, function(err, docs) {
            if (err) { return next(err); }
            const result1 = docs[0];
            const result2 = docs[1];
            const result3 = docs[2];
            const result4 = docs[3];

            if (result1.length > 0) { netPurchases = result1[0].total; }
            if (result2.length > 0) { netExpenses = result2[0].total; }
            if (result3.length > 0) { morningSale = result3[0].total; }
            if (result4.length > 0) { eveningSale = result4[0].total; }

            Day.update( { $and: [ 
                                    { _id: dayId } , 
                                    { companyId: companyId }, 
                                    { officeId: officeId }
                                ] }, 
                            { 
                                status: 1, 
                                close: newDate, 
                                morningSale: morningSale, 
                                eveningSale: eveningSale, 
                                netSale: morningSale + eveningSale,
                                netPurchase: netPurchases,
                                netExpense: netExpenses
                            }, 
                                function(err, existing) {

                if (err) { 
                    console.log(err);
                    return next(err); 
                }
                res.send('Day close');
                next();
            });

        });
    });

};

exports.printCloseDay = function(req, res, next) {
    const dayId = req.headers.dayid;
    var wstream = fs.createWriteStream('pdf/' + dayId + '.cld');    // take this extension in service to get proper report print
    wstream.end();
    next();
};

exports.printThisDay = function(req, res, next) {
    const dayId = req.params.id;
    var wstream = fs.createWriteStream('pdf/' + dayId + '.cld');    // take this extension in service to get proper report print
    wstream.end();
    res.send(200);
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Day.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]}, {}, { sort: {_id: -1} }, function(err, days) {

        if (err) { return next(err); }
        //res.setHeader('Content-Type', 'application/json');
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
                    { _id: req.params.id }
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

    var startDay = new Date(req.query.fromDate);
    var endDay = new Date(req.query.toDate);
    var oneDay = 1000 * 60 * 60 * 24;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

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
    var startRow = 2;
    
    const titleRowNumber = startRow-1;
    const titleRow = worksheet.getRow(titleRowNumber);

    const dateRowNumber = startRow + 1;
    const dateRow = worksheet.getRow(dateRowNumber);

    const dayRowNumber = startRow + 2;
    const dayRow = worksheet.getRow(dayRowNumber);

    const morningSaleRowNumber = startRow + 3;
    const morningSaleRow = worksheet.getRow(morningSaleRowNumber);

    const eveningSaleRowNumber = startRow + 4;
    const eveningSaleRow = worksheet.getRow(eveningSaleRowNumber);

    const totalSaleRowNumber = startRow + 5;
    const totalSaleRow = worksheet.getRow(totalSaleRowNumber);

    const netBalanceRowNumber = startRow + 6;
    const netBalanceRow = worksheet.getRow(netBalanceRowNumber);

    const totalPurchaseRowNumber = startRow + 7;
    const totalPurchaseRow = worksheet.getRow(totalPurchaseRowNumber);

    const expenseTotalRowNumber = startRow + 9;
    const expenseTotalRow = worksheet.getRow(expenseTotalRowNumber);

    const expenseRow = expenseTotalRowNumber + 1;

    //worksheet.addRow();
    titleRow.getCell(1).value = 'Expense Detail Report';
    titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: '03A9F4' }};

    netBalanceRow.font = { bold: true, color: { argb: '009688' }};
    totalPurchaseRow.font = { color: { argb: 'FF5722' } };
    expenseTotalRow.font = { color: { argb: 'D21025' } };

    dateRow.getCell(1).value = 'Date';
    dateRow.font = { bold: true };
    dayRow.getCell(1).value = 'Day';
    dayRow.font = { bold: true };
    dateHeader = startDay;
    dateHeader.setHours(0);
    dateHeader.setMinutes(0);
    //console.log("dateHeader", dateHeader, moment(dateHeader).format('dddd'));
    //dateHeader.setDate(dateHeader.getFullYear(), dateHeader.getMonth(), dateHeader.getDate(), 0,0,0);
    for (i = 0; i<totalDays; i++ ){
        dayRow.getCell(i+2).value = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('dddd') ;
    }
    
    morningSaleRow.getCell(1).value = 'Morning Sale';
    morningSaleRow.getCell(1).font = { bold: true };
    eveningSaleRow.getCell(1).value = 'Evening Sale';
    eveningSaleRow.getCell(1).font = { bold: true };
    totalSaleRow.getCell(1).value = 'Total Sale';
    totalSaleRow.getCell(1).font = { bold: true };
    netBalanceRow.getCell(1).value = 'Net';
    netBalanceRow.getCell(1).font = { bold: true };
    totalPurchaseRow.getCell(1).value = "Total Purchase";
    totalPurchaseRow.getCell(1).font = { bold: true };
    expenseTotalRow.getCell(1).value = 'Total of Expanses';
    expenseTotalRow.getCell(1).font = { bold: true };

    var queries = [];
    queries.push(function(cb){
        Day.find({ 
            $and: [ 
                    // { companyId: companyId }, 
                    // { officeId: officeId }, 
                    { today: {
                        $gte: startDay,
                        $lte: endDay
                    }}
                ] }, function(err, days){
                    if (err) { cb(err); }
                    cb(null, days);
        });
    });

    queries.push(function(cb) {
        Expense.find({ 
            $and: [
                // { companyId: companyId },
                // { officeId: officeId },
                { created: {
                    $gte: startDay,
                    $lte: endDay
                }}
            ] }, {}, { sort : {created: 1} }, function(err, expenses){

            if (err) { cb(err); }
            cb(null, expenses);
        });
    });

    queries.push(function(cb) {
        Purchase.find({ "$and": [
                    // { "companyId": companyId },
                    // { "officeId": officeId },
                    { "created": { "$gte": startDay, "$lte": endDay }},
                    //{ "created": { "$lte": newDate }}
                ]
            }, function(err, purchases) {
            if (err) { cb(err); }
            cb(null, purchases);
        });
    });

    queries.push(function(cb) {
        Customer.find({ "$and": [
                    //{ "companyId": companyId },
                    //{ "officeId": officeId },
                    { "created": { "$gte": startDay } },
                    { "finished": { "$lte": endDay } },
                    { "products.type": 3 },
                ]
            }, function(err, customers) {
            if (err) { cb(err); }

            console.log('customers', customers);
            cb(null, customers);
        });
    });    

    async.parallel(queries, function(err, docs) {
        if (err) { next(err); }

        const days = docs[0];
        const expenses = docs[1];
        const purchases = docs[2];
        const customers = docs[3];

        var filterDays = days.map(function(day,index){
            return day._id;
        });

        for (i=0; i<expenses.length; i++){
            worksheet.getRow(expenseRow+i).getCell(1).value = expenses[i].categoryName;
        }

        for (i = 0; i< totalDays; i++ ){
            expenseTotalRow.getCell(i+2).value = { formula: 'SUM(' + columnToLetter(i+2) + expenseRow + ':'+ columnToLetter(i+2) + (expenseRow + expenses.length - 1) + ')'};
            // var col = worksheet.getColumn(i+2);
            // col.dataValidation = {
            //     type: 'date',
            //     allowBlank: true
            // };
            // col.header = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('DD-MMM-YYYY') ;
            dateRow.getCell(i+2).value = moment(new Date(dateHeader.getTime() + (86400000 * i))).format('DD-MMM-YYYY') ;
            dateRow.getCell(i+2).font = { bold: true };
            dayRow.getCell(i+2).font = { bold: true };
            var dayNumber = new Date(dateHeader.getTime() + (86400000 * i)).getDate();
            var monthNumber = new Date(dateHeader.getTime() + (86400000 * i)).getMonth();
            var yearNumber = new Date(dateHeader.getTime() + (86400000 * i)).getFullYear();

            var dayId = days.filter(function(item, index) {
                var today = new Date(item.today);
                return (today.getDate() === dayNumber && today.getMonth() === monthNumber && today.getFullYear() === yearNumber);
            });

            if (dayId.length > 0) {
                var dayTotal = days.filter(function(item, index) {
                    return dayId[0]["_id"] === item["_id"];
                });
                morningSaleRow.getCell(i+2).value = dayTotal.length === 1 ? dayTotal[0].morningSale : 0;
                eveningSaleRow.getCell(i+2).value = dayTotal.length === 1 ? dayTotal[0].eveningSale : 0;
                totalSaleRow.getCell(i+2).value = dayTotal.length === 1 ? dayTotal[0].netSale : 0;
            }

            // purchase calculation
            var purchaseId = purchases.filter(function(item, index) {
                var purchaseDate = new Date(item.created);
                return (purchaseDate.getDate() === dayNumber && purchaseDate.getMonth() === monthNumber && purchaseDate.getFullYear() === yearNumber);
            });
            if (purchaseId.length > 0) {
                var purchaseTotal = 0;
                for (k=0; k< purchaseId.length; k++) {
                    purchaseTotal = purchaseTotal + parseFloat(purchaseId[k].total);
                }
                totalPurchaseRow.getCell(i+2).value = purchaseTotal;
            }

            var expenseId = expenses.filter(function(item, index) {
                var expenseDate = new Date(item.created);
                return (expenseDate.getDate() === dayNumber && expenseDate.getMonth() === monthNumber && expenseDate.getFullYear() === yearNumber);
            });
            if (expenseId.length > 0) {
                for (j=0; j< expenseId.length; j++) {
                    var row1 = worksheet.getRow(getRowNuber(worksheet, expenseId[j].categoryName)); // worksheet.getRow(10 + i);
                    // row1.getCell(i+2).font = {
                    //     color: {argb: 'D21025'}
                    // };
                    row1.getCell(i+2).value = expenseId[j].amount;
                }
            }
            netBalanceRow.getCell(i+2).value = { formula: '(' + columnToLetter(i+2) + totalSaleRowNumber + '-' +
                                                             columnToLetter(i+2) + expenseTotalRowNumber + '-' +
                                                             columnToLetter(i+2) + totalPurchaseRowNumber + ')' };
        }
        morningSaleRow.getCell(totalDays + 3).value = 'Total Morning : ';
        morningSaleRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + morningSaleRowNumber + ':' + columnToLetter(totalDays+1) + morningSaleRowNumber + ')'};

        eveningSaleRow.getCell(totalDays + 3).value = 'Total Evening : ';
        eveningSaleRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + eveningSaleRowNumber + ':' + columnToLetter(totalDays+1) + eveningSaleRowNumber + ')'};

        totalSaleRow.getCell(totalDays + 3).value = 'Total Sale : ';
        totalSaleRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + totalSaleRowNumber + ':' + columnToLetter(totalDays+1) + totalSaleRowNumber + ')'};

        netBalanceRow.getCell(totalDays + 3).value = 'Net Balance : ';
        netBalanceRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + netBalanceRowNumber + ':' + columnToLetter(totalDays+1) + netBalanceRowNumber + ')'};

        totalPurchaseRow.getCell(totalDays + 3).value = 'Total Purchase : ';
        totalPurchaseRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + totalPurchaseRowNumber + ':' + columnToLetter(totalDays+1) + totalPurchaseRowNumber + ')'};
        
        expenseTotalRow.getCell(totalDays + 3).value = 'Total Expense : ';
        expenseTotalRow.getCell(totalDays + 4).value = { formula: 'SUM(B' + expenseTotalRowNumber + ':' + columnToLetter(totalDays+1) + expenseTotalRowNumber + ')'};
        expenseTotalRow.getCell(totalDays + 4).font = { color: {argb: 'D21025'} };

        var fileName = new Date().getTime() + '.xlsx';
        var fullPath = __dirname + '/../excel/' + fileName ;

// res.writeHead(200, {
//       'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'Content-Disposition': fileName,
//     });

//     workbook.xlsx.write(res);
//res.end();
//request().pipe(res);
//stream.pipe(workbook.csv.createInputStream());
        workbook.xlsx.writeFile(fullPath)
                .then(function() {
                    // done 
                    //res.setHeader('Content-Type', 'application/json');
                    //res.sendFile('./excel/excel.xlsx');
                    console.log("excel file created");
                });
    });

};

function getRowNuber(worksheet, value) {
    var index = 0;
    worksheet.eachRow(function(row, rowNumber) {
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