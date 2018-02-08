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

    static getPurchaseItemTransaction(fromDate, toDate) {
        return Api.get('purchase/item/bydate', { fromDate: fromDate, toDate: toDate });
        //return Api.get('purchase/item/bydate', params);
    }

}

export default ReportApi;