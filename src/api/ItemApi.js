import Api from './Api';

const items = [];

class ItemApi {
  static getAllItems() {
      return Api.get('item');
  }

  static saveItem( item ) {
    console.info("saveItem", item);
    if (item._id !== 0) {
      return Api.put('item/'+item._id+'/update', item);
    } else {
      return Api.post('item/create', item);
    }
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