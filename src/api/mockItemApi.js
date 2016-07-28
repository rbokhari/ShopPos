import delay from './delay';

const items = [
  {
    id: 1,
    name: "First Item",
    description: "http://www.pluralsight.com/courses/react-flux-building-applications",
    stock: "10",
    status: "1"
  },
  {
    id: 2,
    name: "Second Item",
    description: "http://www.pluralsight.com/courses/react-flux-building-applications",
    stock: "20",
    status: "1"
  },
  {
    id: 3,
    name: "third Item",
    description: "http://www.pluralsight.com/courses/react-flux-building-applications",
    stock: "15",
    status: "1"
  },
  {
    id: 4,
    name: "Fourth Item",
    description: "http://www.pluralsight.com/courses/react-flux-building-applications",
    stock: "100",
    status: "1"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (item) => {
  return items.length + 2;
};

class ItemApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], items));
      }, delay);
    });
  }

  static saveItem( item ) {
    item = Object.assign({}, item); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        // Simulate server-side validation
        const minNameLength = 1;
        if (item.name.length < minNameLength) {
          reject(`Name must be at least ${minNameLength} characters.`);
        }

        if (item.id) {
          const existingItemIndex = items.findIndex(a => a.id == item.id);
          items.splice(existingItemIndex, 1, item);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          item.id = generateId( item );
          item.description = `http://www.pluralsight.com/courses/${item.id}`;
          items.push( item );
        }

        resolve( item );
      }, delay );
    } );
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