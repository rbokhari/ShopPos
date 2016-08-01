import Api from './Api';

const purchaseOrders = [];

class PurchaseOrderApi {

  static getAll() {
      return Api.get('purchase');
  }

  static savePurchaseOrder( purchaseOrder ) {
    return Api.post('purchase/create', po, config);
  }
}

export default PurchaseOrderApi;