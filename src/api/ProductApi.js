import delay from './delay';
import axios from 'axios';

const products = [];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (product) => {
  return product.length + 1;
};

class ProductApi {
    
  static getAllProducts() {
    return axios.get('http://localhost:3090/product');
  }

  static saveProduct(product) {
    product = Object.assign({}, product); // to avoid manipulating object passed in.
    console.log(typeof product._id ===  'undefined');
    if (typeof product._id ===  'undefined') {
      return axios.post('http://localhost:3090/product/create', product);
    }else {
      return axios.post('http://localhost:3090/product/edit', product);
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