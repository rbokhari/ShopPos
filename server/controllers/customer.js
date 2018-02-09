const ObjectId = require('mongoose').Types.ObjectId;

//const pdfMake = require('pdfmake');
var fs = require('fs');
var path = require('path');
//var pdfMakePrinter = require('pdfmake/src/printer');
    //var PdfPrinter = require('pdfmake/src/printer');

const Customer = require('../models/customer');
const Item = require('../models/item');
const Day = require('../models/day');

// fonts are available in the test-env/tests/fonts path, this is a helper
function fontPath(file) {
  return path.resolve('node_modules', 'pdfmake', 'test-env', 'tests', 'fonts', file);
}

exports.createCustomer = function(req, res, next) {
    //var data = JSON.parse(req.body);
    //console.log("customer",req.headers, req.body);
    var productsItem = req.body.products;
    var customer = new Customer({
        companyId: req.headers.companyid,
        officeId: req.headers.officeid,
        dayId: req.headers.dayid,
        carNumber: req.body.carNumber,
        mobileNumber: req.body.mobileNumber,
        created: new Date().now,
        createdOffset: new Date().getTimezoneOffset(),
        option: req.body.option,
        status: req.body.status,
        products: productsItem
    });
    
    //customer.products = req.body.products;
    Customer.count({}, function(err, c) {
        if (err) { return next(err); }
        customer.billNo = c + 1;

        customer.products.forEach(function(product, index) {
            product.items.forEach(function(item, i) {
                Item.update({_id: item.itemId},  { $inc : { stock : -(item.qty * product.qty) } }, function(err, numAffected) {
                    if (index === customer.products.length-1 && i === product.items.length -1) {
                        customer.save(function(err){
                            if (err) { return next(err); }
                            next();
                            res.setHeader('Content-Type', 'application/json');
                            res.json(customer);
                        });
                    }
                });
            });
        });
    });
};

exports.updateCustomer = function(req, res, next) {
    // next();
    // res.json(req.body);
    const finishedDate = new Date().now; 
    var customerUpdate = {
        status: req.params.newStatus, 
        finished: new Date() 
    };
    Customer.update({_id: req.params.id}, customerUpdate, { multi: false }, function(err, numAffected) {
        if (err) { return next(err); }
        next();
        res.json(req.body);
    });
};

exports.printReceipt = function(req, res, next) {
    const id = req.params.id;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const newStatus = req.params.newStatus;

    Customer.find( { $and: [{ companyId: companyId },{ officeId: officeId }, { _id: id } ]}, function(err, customer) {
        if (err) { return next(err); }

        if (newStatus != 3) { return next(); }  // when dispatch then print

        var wstream = fs.createWriteStream('pdf/'+id+'.txt');
//wstream.write(customer);
// wstream.write('Another line\n');
        wstream.end();
        next();
        //req.sendStatus(200);

// var fontDescriptors = {
//   Roboto: {
//     normal: fontPath('Roboto-Regular.ttf'),
//     bold: fontPath('Roboto-Medium.ttf'),
//     italics: fontPath('Roboto-Italic.ttf'),
//     bolditalics: fontPath('Roboto-Italic.ttf'),
//   }
// }; 

// //var printer = new pdfMake(fontDescriptors);
// var docDefinition = {
//         content: [
//             'First paragraph',
//             'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//         ]
//     };

    // var writeStream = fs.createWriteStream('pdf/'+id+'.pdf');
    // var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(writeStream).on('end', function() {
    //     console.log('pdf done');
    //     pdfDoc.end();
    //     next();
    // });
    //pdfDoc.end();
    //fs.createWriteStream('pdf/'+id+'.pdf');
    // pdfDoc.pipe(fs.createWriteStream('pdf/'+id+'.pdf')).on('finish', function () {      
    //     console.log('done pdf 0');
    //     pdfDoc.end();
    //     console.log('done pdf');
    //     next();
    //     res.send(true);
    // });

        // var dd = {
        //         pageSize: 'c7',
        //         pageMargins: [ 10, 1, 40, 60 ],
        //         content: [
        //                     { text: 'Tea and Coffee', style: 'header' },
        //                     'Tea Shop',
        //                     { text: 'Items:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
        //                     {
        //                             style: 'tableExample',
        //                             table: {
        //                                     headerRows: 1,
        //                                     body: [
        //                                             [
        //                                                 { text: 'SN', style: 'tableHeader' },
        //                                                 { text: 'Item', style: 'tableHeader' }, 
        //                                                 { text: 'Qty', style: 'tableHeader'}, 
        //                                                 { text: 'Price', style: 'tableHeader' },
        //                                                 { text: 'Total', style: 'tableHeader' }
        //                                             ],
        //                                             [ '1.', 'Chicken Burger', '1', '1.1', '1.1' ],
        //                                             [ '2.', 'Beaf', '2', '1.2', '2.2' ]
        //                                     ]
        //                             },
        //                             layout: 'lightHorizontalLines'
        //                     },
        //         ],
        //         styles: {
        //             header: {
        //                 fontSize: 18,
        //                 bold: true,
        //                 margin: [0, 0, 0, 10]
        //             },
        //             subheader: {
        //                 fontSize: 12, 
        //                 bold: true,
        //                 margin: [0, 10, 0, 5]
        //             },
        //             tableExample: {
        //                 margin: [0, 5, 0, 15]
        //             },
        //             tableHeader: {
        //                 bold: true,
        //                 fontSize: 10,
        //                 color: 'black'
        //             }
        //         },
        //         defaultStyle: {
        //             alignment: 'justify'
        //         }
                
        //     };
        //      //pdfMake.createPdf(dd).print();
        //      //open the PDF in a new window
        //     pdfMake.createPdf(dd).open();

            // print the PDF (temporarily Chrome-only)
            //pdfMake.createPdf(dd).print();

            // download the PDF (temporarily Chrome-only)
            // const doc = new pdfMake();
            // doc.createPdf(dd).download('optionalName.pdf');
            //next();
    });
};

    // Customer.findById( req.params.id, function(err, doc) {
    //     doc.status = 1;
    //     doc.save(function(err){
    //         if (err) console.log(err)
    //         else console.log("success");
    //         res.json("done");
    //     });
    // });


exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    
    Customer.find({
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]
    }, function(err, customers){
        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    });
};

exports.getAllByStatus = function(req, res, next) {
    const status = req.params.status;   // e.g. 0 = issue, 1 = Kitchen finished, 2 = devliered
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    if (companyId != '0' && officeId != '0') {
        Customer.find({ 
            $and: [
                {companyId: companyId},
                {officeId: officeId },
                { $or: [{status: 0}, {status: 1}, {status: 2}] }
            ] }, {}, { sort : {created: 1} }, function(err, customers){
            

            if (err) { return next(err); }
            //next();
            res.setHeader('Content-Type', 'application/json');
            res.json(customers);
        });
    } else {
        res.json({});
    }
};

exports.getCustomersByDayId = function(req, res, next) {
    const dayId = req.params.dayId;   // e.g. 0 = issue, 1 = Kitchen finished, 2 = devliered
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    if (companyId != '0' && officeId != '0') {
        Customer.find({ 
            $and: [
                {companyId: companyId},
                {officeId: officeId },
                { dayId: dayId }
            ] }, {}, { sort : {created: 1} }, function(err, customers){
            

            if (err) { return next(err); }
            //next();
            res.setHeader('Content-Type', 'application/json');
            res.json(customers);
        });
    } else {
        res.json({});
    }
};

exports.getById = function(req, res, next) {
    console.log("unnessary load , check this");
    // Customer.find({ _id: req.params.id }, function(err, customer){
    //     if (err) { return next(err); }

    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(customer);
    // });
};

/* Reports */

exports.getTransaction = function(req, res, next) {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    
    Day.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    { today: {
                        $gte: fromDate,
                        $lte: toDate
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
                //next();
                res.setHeader('Content-Type', 'application/json');
                res.json(customers);
            });
        } else {
            res.json({});
        }
    });

};

exports.getCustomerProductByDate = function(req, res, next) {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);
    const productId = req.query.productId;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    
    Customer.aggregate([
        { 
            "$match":
                {
                    "$and": [
                        { companyId: ObjectId(companyId) },
                        { officeId: ObjectId(officeId) },
                        { finished: { '$gte': fromDate, '$lte': toDate } }
                        //{ "_id": ObjectId('591781594369bc0934c21f78') },
                    ]
                }
        },
        {
            "$unwind": "$products"
        },
        { "$project":
            {
                "_id": 1,
                "billNo" : 1,
                "finished": 1,
                //"total": "$amounts.amount",
                //"created": "$amounts.date", //{ $ifNull: ["$amounts.date", "no date" ] },
                "products": "$products"
            }
        },
        {
            "$match":
            {
                "products.productId": ObjectId(productId) 
            }
        }
    ], function(err, products) {
        if (err) return next(err); 
        res.status(200).json(products);
    });

};