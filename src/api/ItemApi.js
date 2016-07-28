import delay from './delay';
import axios from 'axios';

const items = [];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (item) => {
  return items.length + 2;
};

class ItemApi {
  static getAllItems() {
      return axios.get('http://localhost:3090/item');
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(Object.assign([], items));
    //   }, delay);
    // });
  }

  static saveItem( item ) {
    const itm = Object.assign({}, item); // to avoid manipulating object passed in.
    var config = {
      headers: { 
        'token': 'token-xxx',
        'companyId': '5790741257ec444416631b3b',
        'officeId': '5790753931381a4c0a95ba44'
      }
    };
    return axios.post('http://localhost:3090/item/create', itm);
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