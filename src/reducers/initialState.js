export default {
    company: {},
    branch: {
        isLoad: false,
        isCreateLoad: false,
        current: {},
        all: []
    },
    isLoadPasswordDialog: false,
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
    reportPurchaseData: [],
    ajaxCallsInProgress: 0
};