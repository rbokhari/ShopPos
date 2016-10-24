import Api from './Api';

const categories = [];

class CategoryApi {
  static getAllCategories() {
    return Api.get('category');
  }

  static saveCategory( category ) {    
    if (category._id !== '0') {
      return Api.put(`category/${category._id}/update`, category);
    } else {
      return Api.post('category/create', category);
    }
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