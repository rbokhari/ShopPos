import Api from './Api';

const data = [];

class ReportApi {

    static getCustomerTransaction(fromDate, toDate) {
        return Api.get('customer/transaction/byDate', { fromDate: fromDate, toDate: toDate });
    }

    static getExpenseTransaction(fromDate, toDate) {
        return Api.get('expense/transaction/byDate', { fromDate: fromDate, toDate: toDate });
    }

    static getPurchaseTransaction(fromDate, toDate) {
        return Api.get('purchase/transaction/byDate', { fromDate: fromDate, toDate: toDate });
    }

    static getDownloadExpenseDetail(fromDate, toDate) {
        return Api.get('day/excel', { fromDate: fromDate, toDate: toDate } );
    }

    static getPurchaseItemTransaction(params) { // params: fromDate, toDate, itemId
        return Api.get('purchase/transaction/itembydate', params);
    }

    static getCustomerProductTransaction(params) {  // params: fromDate, toDate, productId
        return Api.get('customer/transaction/productbydate', params);
    }

}

export default ReportApi;