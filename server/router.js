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
const User = require('./controllers/user');
const ExpenseMaster = require('./controllers/expenseMaster');
const Expense = require('./controllers/expense');
const Supplier = require('./controllers/supplier');
const Day = require('./controllers/day');

const requireAuth = passport.authenticate('jwt', { session: false });   // deafult is cookie based, which we turn false
const requireLocal = passport.authenticate('local', { session: false });

module.exports = function(app, io) {

    app.post('/signup', Authentication.signup);
    app.post('/signin', requireLocal, Authentication.signin);
    app.post('/account/create', Authentication.createAccount);
    app.get('/user/', requireAuth,  Authentication.user);
    app.post('/user/changePassword', requireAuth, requireLocal, User.changePassword);

    // Company Routes
    app.post('/company/exists', Company.companyExists);
    app.post('/company/create', Company.createCompany);
    app.put('/company/:id/update', Company.updateCompany);
    app.get('/company/', Company.getAll);
    app.get('/company/:id', Company.getById);

    // Office Routes
    app.post('/office/create', Office.createOffice);
    app.put('/office/:id/update', Office.updateOffice);
    app.put('/office/:id/activate', Office.deactivateAll, Office.activateOne);
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

    // Supplier Routes
    app.post('/supplier/create', Supplier.createSupplier);
    app.put('/supplier/:id/update', Supplier.updateSupplier);
    app.get('/supplier/', Supplier.getAll);
    app.get('/supplier/:id', Supplier.getById);

    // Customer Routes
    app.post('/customer/create', Customer.createCustomer, (req, res, next) => { io.sockets.emit('customer', '1'); });
    app.put('/customer/:id/:newStatus', 
                Customer.updateCustomer, 
                Customer.printReceipt, 
                (req, res, next) => { io.sockets.emit('customer', '1'); });
    app.get('/customer/:status', Customer.getAllByStatus); //, (req, res) => { console.log("socket emit here"); io.sockets.emit('customer', '1'); } );
    app.get('/customer/:dayId/day', Customer.getCustomersByDayId);
    app.get('/customer/:id/:newStatus/print', 
                Customer.printReceipt,
                (req, res, next) => { res.sendStatus(200); });

    // Purchase Routes
    app.post('/purchase/create', Purchase.createPurchase);
    //app.put('/purchase/:id/update', Purchase.updatePurchase);
    app.get('/purchase/', Purchase.getAll);
    app.get('/purchase/item/:itemId', Purchase.getAllByItemId); 
    app.get('/purchase/:id', Purchase.getById);
    
    // User Routes
    app.post('/users/create', User.createUser);
    app.put('/users/:id/update', User.updateUser);
    app.get('/users/', User.getAll);
    app.get('/users/:id', User.getById);

    // Expense Master Routes
    app.post('/expensemaster/create', ExpenseMaster.create);
    app.put('/expensemaster/:id/update', ExpenseMaster.update);
    app.get('/expensemaster/', ExpenseMaster.getAll);
    app.get('/expensemaster/:id', ExpenseMaster.getById);

    // Expense Routes
    app.post('/expense/create', Expense.createExpense);
    app.put('/expense/:id/update', Expense.updateExpense);
    app.get('/expense/', Expense.getAll);
    app.get('/expense/:id', Expense.getById);

    // Reports Routes 
    app.get('/customer/transaction/bydate', Customer.getTransaction);
    app.get('/expense/transaction/bydate', Expense.getByDate);
    app.get('/purchase/transaction/bydate', Purchase.getByDate);

    // Days Routes
    app.post('/day/create', Day.createDay);
    app.put('/day/close', Day.closeDay, Day.printCloseDay);
    app.get('/day/:id/print', Day.printThisDay);
    app.get('/day/', Day.getAll);
    //app.get('/day/:id', Day.getById);
    app.get('/day/open', Day.getOpenDay);
    app.get('/day/byDates', Day.getDayBetweenDates);
    app.get('/day/excel', Day.getExcelBetweenDates);
    //app.get('/excel/:id', Day.openExcelFile);
    
    app.get('/day/:id', Day.getById);
    // app.get('/', function(req, res, next) {
    //     res.send(['a', 'b', 'c']);
    // });

};
