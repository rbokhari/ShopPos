const Item = require('./controllers/item');
const Company = require('./controllers/company');
const Office = require('./controllers/office');
const Category = require('./controllers/category');
const Product = require('./controllers/product');
const Customer = require('./controllers/customer');

module.exports = function(app) {

    // Company Routes
    app.post('/company/create', Company.createCompany);
    app.put('/company/:id/update', Company.updateCompany);
    app.get('/company/', Company.getAll);
    app.get('/company/:id', Company.getById);

    // Office Routes
    app.post('/office/create', Office.createOffice);
    app.put('/office/:id/update', Office.updateOffice);
    app.get('/office/', Office.getAll);
    app.get('/office/:id', Office.getById);

    // Item Routes
    app.post('/item/create', Item.createItem);
    app.put('/item/:id/update', Item.updateItem);
    app.get('/item/', Item.getAll);
    app.get('/item/:id', Item.getById);

    // Product Routes
    app.post('/product/create', Product.createProduct);
    app.put('/product/:id/update', Product.updateProduct);
    app.get('/product/', Product.getAll);
    app.get('/product/:id', Product.getById);


    // Category Routes
    app.post('/category/create', Category.createCategory);
    app.put('/category/:id/update', Category.updateCategory);
    app.get('/category/', Category.getAll);
    app.get('/category/:id', Category.getById);

    // Customer Routes
    app.post('/customer/create', Customer.createCustomer);
    app.put('/customer/:id/update', Customer.updateCustomer);
    app.get('/customer/:status', Customer.getAllByStatus);
    app.get('/customer/:id', Customer.getById);



    // app.get('/', function(req, res, next) {
    //     res.send(['a', 'b', 'c']);
    // });

};