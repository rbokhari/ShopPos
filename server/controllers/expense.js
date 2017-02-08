const Expense = require('../models/expense');

exports.createExpense = function(req, res, next) {
    
    //const code = req.body.name;
    const created = req.body.created;
    const description = req.body.description;
    const amount = req.body.amount;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    const expense = new Expense({
        //code: code,
        created: created,
        description: description,
        amount: amount,
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

exports.updateExpense = function(req, res) {
    //res.json('Got a PUT request at category');
    const id = req.body._id;
    const code = req.body.name;
    const created = req.body.status;
    const descrption = req.body.description;
    const amount = req.body.amount;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    Expense.update( { $and: [ { _id: id } , 
                            { companyId: companyId }, 
                            { officeId: officeId }
                        ] }, 
                    { code: code, description: descrption, amount: amount, created: created }, 
                        function(err, existingItem) {

        if (err) { return next(err); }
        res.send('Done Expense Update');
    });
};

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Expense.find({ 
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]}, {}, { sort : {created: -1} }, function(err, expenses){
            
        if (err) { return next(err);     }
        res.setHeader('Content-Type', 'application/json');
        res.json(expenses);
    });
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