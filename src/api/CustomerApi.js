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

//   static deleteCategory( categoryId ) {
//     return new Promise( ( resolve, reject ) => {
//       setTimeout( () => {
//         const indexOfItemToDelete = categories.findIndex( category => {
//           category.id == categoryId;
//         } );
//         categories.splice( indexOfItemToDelete, 1);
//         resolve();
//       }, delay);
//     });
//   }
  
}

export default CustomerApi;