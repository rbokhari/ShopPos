import axios from 'axios';

const customers = [];

class CustomerApi {

  static getIssueCustomers() {
    return axios({
      url: 'http://localhost:3090/customer/0',
      method: 'get',
      //headers: {'Company-Id': '123456789'}
    });

  }

  static saveCustomer( customer ) {
    const cus = Object.assign( {}, customer ); // to avoid manipulating object passed in.
    const config = {
      headers: { 
        'token': 'token-xxx',
        'companyId': '5790741257ec444416631b3b',
        'officeId': '5790753931381a4c0a95ba44'
      }
    };

    return axios.post('http://localhost:3090/customer/create', cus);
  }

  static updateCustomerStatus( customer ) {
    return axios.put(`http://localhost:3090/customer/${customer._id}/update`, customer);
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