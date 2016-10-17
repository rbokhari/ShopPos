import Api from './Api';

const customers = [];

class CustomerApi {

  static getIssueCustomers() {
    return Api.get('customer/0');
  }

  static saveCustomer( customer ) {
    return Api.post('customer/create', customer);
  }

  static updateCustomerStatus( customer, newStatus ) {
    return Api.put(`customer/${customer._id}/${newStatus}`, customer);
  }
  
}

export default CustomerApi;