import Api from './Api';

const suppliers = [];

class SupplierApi {
  static getAllSuppliers() {
    return Api.get('supplier');
  }

  static saveSupplier( supplier ) {    
    if (supplier._id !== '0') {
      return Api.put(`supplier/${supplier._id}/update`, supplier);
    } else {
      return Api.post('supplier/create', supplier);
    }
  }
  
}

export default SupplierApi;