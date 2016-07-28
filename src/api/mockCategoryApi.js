import delay from './delay';

const categories = [
  { id: 1, name: "Tea", status: "1" },
  { id: 2, name: "Sauce", status: "1" },
  { id: 3, name: "Milk", status: "1" },
  { id: 4, name: "Crosant", status: "1" }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = ( category ) => {
  return categories.length + 1;
};

class CategoryApi {
  static getAllCategories() {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        resolve( Object.assign( [], categories ) );
      }, delay );
    });
  }

  static saveCategory( category ) {
    category = Object.assign( {}, category ); // to avoid manipulating object passed in.
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        // Simulate server-side validation
        const minNameLength = 1;
        if ( category.name.length < minNameLength ) {
          reject(`Name must be at least ${minNameLength} characters.`);
        }

        if ( category.id ) {
          const existingCategoryIndex = categories.findIndex( a => a.id == category.id );
          category.splice( existingCategoryIndex, 1, category );
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          category.id = generateId( category );
          categories.push( category );
        }

        resolve( category );
      }, delay );
    } );
  }

  static deleteCategory( categoryId ) {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        const indexOfItemToDelete = categories.findIndex( category => {
          category.id == categoryId;
        } );
        categories.splice( indexOfItemToDelete, 1);
        resolve();
      }, delay);
    });
  }
  
}

export default CategoryApi;