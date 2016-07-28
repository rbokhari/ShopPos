import delay from './delay';

const products = [
  {
    id: 1,
    name: "Beaf Burger",
    category: 'Burger',
    price: 1,
    status: "1"
  },
  {
    id: 2,
    name: "Chicken Burger",
    category: 'Burger',
    price: 1,
    status: "1"
  },
  {
    id: 3,
    name: "Tomato Ketchup",
    category: 'Sauce',
    price: 1,
    status: "1"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (product) => {
  return product.length + 1;
};

class ProductApi {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }

  static saveProduct(product) {
    product = Object.assign({}, category); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minNameLength = 1;
        if (category.name.length < minNameLength) {
          reject(`Name must be at least ${minNameLength} characters.`);
        }

        if (product.id) {
          const existingIndex = products.findIndex(a => a.id == product.id);
          products.splice(existingIndex, 1, product);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          product.id = generateId(product);
          product.push(category);
        }

        resolve(product);
      }, delay);
    });
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