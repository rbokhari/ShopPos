import Api from './Api';

const items = [];

class ItemApi {
  static getAllItems() {
      return Api.get('item');
  }

  static saveItem( item ) {
    return Api.post('item/create', itm);
  }

  static deleteItem( itemId ) {
    return new Promise( ( resolve, reject) => {
      setTimeout(() => {
        const indexOfItemToDelete = items.findIndex(item => {
          item.id == itemId;
        });
        items.splice(indexOfItemToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ItemApi;