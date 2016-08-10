const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const Item = require('./controllers/item');
const Company = require('./controllers/company');
const Office = require('./controllers/office');
const Category = require('./controllers/category');
const Product = require('./controllers/product');
const Customer = require('./controllers/customer');
const Purchase = require('./controllers/purchase');


const requireAuth = passport.authenticate('jwt', { session: false });   // deafult is cookie based, which we turn false
const requireLocal = passport.authenticate('local', { session: false });

module.exports = function(app, io) {

    app.post('/signup', Authentication.signup);
    app.post('/signin', requireLocal, Authentication.signin);

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
    app.post('/item/create', requireAuth, Item.createItem);
    app.put('/item/:id/update', requireAuth, Item.updateItem);
    app.get('/item/', requireAuth, Item.getAll);
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
    app.post('/customer/create', Customer.createCustomer, (req, res, next) => { io.sockets.emit('customer', '1'); });
    app.put('/customer/:id/:newStatus', Customer.updateCustomer, (req, res, next) => { io.sockets.emit('customer', '1'); });
    app.get('/customer/:status', Customer.getAllByStatus); //, (req, res) => { console.log("socket emit here"); io.sockets.emit('customer', '1'); } );
    app.get('/customer/:id', Customer.getById);

    // Purchase Routes
    app.post('/purchase/create', Purchase.createPurchase);
    //app.put('/purchase/:id/update', Purchase.updatePurchase);
    app.get('/purchase/', Purchase.getAll);
    app.get('/purchase/item/:itemId', Purchase.getAllByItemId); 
    app.get('/purchase/:id', Purchase.getById);
    


    // app.get('/', function(req, res, next) {
    //     res.send(['a', 'b', 'c']);
    // });

};