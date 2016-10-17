import Api from './Api';

const data = [];

class ReportApi {

    static getCustomerTransaction(fromDate, toDate) {
        return Api.get('customer/transaction/byDate', { fromDate: fromDate, toDate: toDate });
    }

    static getExpenseTransaction(fromDate, toDate) {
        return Api.get('expense/transaction/byDate', { fromDate: fromDate, toDate: toDate });
    }

}

export default ReportApi;