import Api from './Api';

const customers = [];

class CustomerApi {

  static getIssueCustomers() {
    return Api.get('customer/0');
  }

  static saveCustomer( customer ) {
    //JSON.stringify(customer)
    return Api.post('customer/create', customer);
  }

  static updateCustomerStatus( customer, newStatus ) {
    return Api.put(`customer/${customer._id}/${newStatus}`, customer);
  }

  static getAllCustomersByDayId(dayId) {
    return Api.get(`customer/${dayId}/day`);
  }

  static printCustomersById(id, newStatus) {
    return Api.get(`customer/${id}/${newStatus}/print`);
  }

  static getCustomerTransactionByProductAndDate(params) { // params : { fromDate, toDate, productId }
    return Api.get(`customer/transaction/productbydate`, params);
  }
  
}

export default CustomerApi;