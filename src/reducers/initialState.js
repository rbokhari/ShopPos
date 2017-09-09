export default {
    company: {},
    branch: {
        isLoad: false,
        isCreateLoad: false,
        current: {},
        all: []
    },
    dialog: {
        isCustomerDetailDialog: false,
        customer: {},   // single customer detail
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
    expenseMasters: [],
    expenses: [],
    reportParam: {
        fromDate: new Date(),
        toDate: new Date()
    },
    reportCustomerData: [],
    reportExpenseData: [],
    reportPurchaseData: [],
    ajaxCallsInProgress: 0,
    authLoading: true,
    notification: {
        type: 'message',
        show: false,
        message: ''
    }
};