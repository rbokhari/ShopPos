export default {
    company: {},
    branch: {
        isLoad: false,
        isCreateLoad: false,
        current: {},
        all: []
    },
    day: {},
    user: {},
    items: [],
    categories: [],
    products: [],
    customers: [],
    suppliers: [],
    purchaseOrders: [],
    users : [],
    expenses: [],
    reportParam: {
        fromDate: new Date(),
        toDate: new Date()
    },
    reportCustomerData: [],
    reportExpenseData: [],
    ajaxCallsInProgress: 0
};