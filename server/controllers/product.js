const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = function(req, res, next) {
    
    const code = req.body.code;
    const name = req.body.name;
    const nameAr = req.body.nameAr;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const status = req.body.status;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    //return res.status(422).send({ error: req.headers.companyid});

    if (!companyId){
        return res.status(422).send({ error: 'Company is not passed'});
    }

    if (!officeId){
        return res.status(422).send({ error: 'office is not passed'});
    }

    // check if item code is already assigned
    Product.findOne( { code: code }, function(err, existingProduct) {
        if (err) { return next(err); }

        if (existingProduct) {
            return res.status(422).send({ error: 'Code is in use !'});
        }

        const product = new Product({
            companyId: companyId,
            officeId: officeId,
            code: code,
            name: name,
            nameAr: nameAr,
            categoryId: categoryId,
            categoryName: '',
            price: price,
            status: status
        });

        product.save(function(err){
            if (err) { return next(err); }

            Category.findOne({_id: product.categoryId}, function(err, category) {
                product.categoryName = category.name;
                res.setHeader('Content-Type', 'application/json');
                
                res.json(product);
            });
        });
    });

};


exports.updateProduct = function(req, res) {
    res.json('Got a PUT request at Product');

    // const name = req.body.name;
    // const status = req.body.status;

    // res.json(name);
//     Category.findOne( { name: name }, function(err, existingName) {
//         if (err) { return next(err); }

//         if (existingName) {
//             return res.status(422).send({ error: 'Name is in defined !'});
//         }

//         const category = new Category({
//             name: name,
//             status: status
//         });
// res.json(category);
        // category.findOneAndUpdate( {_id: req.params.id} ,  function(err, category){ 
        //     if (err) { return next(err); }

        //     res.json(category);
        // });
//    });

};

function getCategoryname(categories, id) {
    //return categories[0].name;
    return categories.filter(function(cat, i){
        return cat._id.toHexString() == id;
    })[0];
}

exports.getAll = function(req, res, next) {
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;
    Product.find({
        $and: [ 
            { companyId: companyId }, 
            { officeId: officeId }
        ]
    }, function(err, products){
        if (err) { return next(err); }

        Category.find({}, function(err, categories) {
            prods = products.map(function(product, index) {
                return {
                    _id: product._id,
                    code: product.code,
                    name: product.name,
                    nameAr: product.nameAr,
                    categoryId: product.categoryId,
                    categoryName: getCategoryname(categories, product.categoryId).name, // categories.filter(function(cat, i) { return (cat._id===product.categoryId); })[0],
                    price: product.price,
                    status: product.status
                };
            });
            res.setHeader('Content-Type', 'application/json');
            res.json(prods);
        });
    });
};

exports.getById = function(req, res, next) {
    Product.findOne({ _id: req.params.id }, function(err, product){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    });
};

exports.getByCategoryId = function(req, res, next) {
    Product.findOne({ categoryId: req.params.categoryId }, function(err, products){
        if (err) { return next(err); }

        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    });
};