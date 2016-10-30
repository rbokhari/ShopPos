import Api from './Api';

const products = [];

class ProductApi {
    
  static getAllProducts() {
    return Api.get('product');
  }

  static saveProduct(product) {
    if (product._id ===  '0') {
      return Api.post('product/create', product);
    }else {
      return Api.put(`product/${product._id}/update`, product);
    }

  }

  static deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfDelete = products.findIndex(product => {
          product.id == productId;
        });
        products.splice(indexOfDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ProductApi;