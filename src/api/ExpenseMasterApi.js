import Api from './Api';

const masters = [];

class ExpenseMasterApi {
  static getAllExpenseMasters() {
    return Api.get('expensemaster');
  }

  static saveExpenseMaster( master ) {    
    if (master._id !== '0') {
      return Api.put(`expensemaster/${master._id}/update`, master);
    } else {
      return Api.post('expensemaster/create', master);
    }
  }

}

export default ExpenseMasterApi;