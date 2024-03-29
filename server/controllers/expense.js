const Expense = require('../models/expense');

exports.createExpense = function(req, res, next) {
    
    //const code = req.body.name;
    const created = req.body.created;
    const description = req.body.description;
    const amount = req.body.amount;
    const categoryId = req.body.categoryId;
    const categoryName = req.body.categoryName;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    const expense = new Expense({
        //code: code,
        dayId: req.headers.dayid,
        created: created,
        description: description,
        amount: amount,
        categoryId: categoryId,
        categoryName: categoryName,
        companyId: companyId,
        officeId: officeId
    });

    Expense.count({ $and : [ {companyId: companyId }, {officeId: officeId }]}, function(err, cn){
        if (err) { return next(err); }
        expense.code = cn+1;
        expense.save(function(err){
            if (err) { return next(err); }

            res.setHeader('Content-Type', 'application/json');
            res.json(expense);
        });

    });

};

exports.updateExpense = function(req, res, next) {
    //res.json('Got a PUT request at category');
    const id = req.body._id;
    const code = req.body.name;
    const created = req.body.created;
    const descrption = req.body.description;
    const amount = req.body.amount;

    Expense.update( { $and: [ { _id: id } , 
                            // { companyId: companyId }, 
                            // { officeId: officeId }
                        ] }, 
                    { description: descrption, amount: amount, created: created }, 
                        function(err, existingItem) {

        if (err) { return next(err); }
        res.send('Done Expense Update');
    });
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    const query = Expense.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]})
        .sort({created: -1})
        .limit(200);

    query.find(function(err, expenses) {
        if (err) { return next(err);     }
        res.setHeader('Content-Type', 'application/json');
        res.json(expenses);
    });

    // Expense.find({ 
    //     $and: [ 
    //         { companyId: companyId }, 
    //         { officeId: officeId }
    //     ]}, {}, { sort : {created: -1} }, function(err, expenses){
            
    //     if (err) { return next(err);     }
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(expenses);
    // });
};

exports.getById = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Expense.find({ 
            $and: [ 
                    { companyId: companyId }, 
                    { officeId: officeId }, 
                    {_id: req.params.id}
                ]}, function(err, expense){

        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(expense);
    });
};

exports.getByDate = function(req, res, next) {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Expense.find({ 
        $and: [
            { companyId: companyId },
            { officeId: officeId },
            { created: {
                $gte: fromDate,
                $lte: toDate
            }}
        ] }, {}, { sort : {created: -1} }, function(err, expenses){
        

        if (err) { return next(err); }
        res.setHeader('Content-Type', 'application/json');
        res.json(expenses);
    });
};