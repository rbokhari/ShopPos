const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = function(req, res, next) {
    
    const code = req.body.code;
    const name = req.body.name;
    const nameAr = req.body.nameAr;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const status = req.body.status;
    const type = req.body.type;
    const items = req.body.items;
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
            status: status,
            type: type,
            items: items
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
    const _id = req.body._id;
    const code = req.body.code;
    const name = req.body.name;
    const nameAr = req.body.nameAr;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const status = req.body.status;
    const type = req.body.type;
    const items = req.body.items;
    const companyId = req.headers.companyid;
    const officeId = req.headers.officeid;

    //return res.status(422).send({ error: req.headers.companyid});

    if (!companyId){
        return res.status(422).send({ error: 'Company is not passed'});
    }

    if (!officeId){
        return res.status(422).send({ error: 'office is not passed'});
    }

    const product = new Product({
        _id: _id,
        companyId: companyId,
        officeId: officeId,
        code: code,
        name: name,
        nameAr: nameAr,
        categoryId: categoryId,
        categoryName: '',
        price: price,
        status: status,
        type: type,
        items: items
    });

    // check if item code is already assigned
    Product.remove( { _id: _id }, function(err) {
        if (err) { return next(err); }

        // if (existingProduct) {
        //     return res.status(422).send({ error: 'Code is in use !'});
        // }
        // existingProduct.items.forEach(function(item) {
        //     console.log("item :" + item._id);
        //     item.remove();
        // });

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
                    status: product.status,
                    type: product.type,
                    items: product.items
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