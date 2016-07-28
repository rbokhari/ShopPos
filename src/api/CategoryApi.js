import delay from './delay';
import axios from 'axios';

const categories = [];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = ( category ) => {
  return categories.length + 1;
};

class CategoryApi {
  static getAllCategories() {
    // const config = {
    //   headers: { 
    //     'token': 'token-xxx',
    //     'companyId': '5790741257ec444416631b3b',
    //     'officeId': '5790753931381a4c0a95ba44'
    //   }
    // };
    // axios.interceptors.request.use(function (config) {

    //   var token = auth.getToken();

    //   // if (token) {
    //   //   config.headers['authorization'] = 'Bearer ' + token;
    //   // }

    //     config.headers['X-Requested-With'] = 'XMLHttpRequest';
    //     // config.headers['Expires'] = '-1';
    //     // config.headers['Cache-Control'] = "no-cache,no-store,must-revalidate,max-age=-1,private";

    //     // if (ie && config.method == 'get') {
    //     //   config.url = buildUrl(config.url, { timestamp: Date.now().toString() });
    //     // }

    //     return config;

    //   }, function (err) {

    //     return Promise.reject(err);
    //   });
    //return axios.get('http://localhost:3090/category', JSON.stringify({ 'headers': {'CompanyId': 'power', 'OfficeId':'123456789'} }) );

    return axios({
      url: 'http://localhost:3090/category',
      method: 'get',
      //headers: {'Company-Id': '123456789'}
    });
    
        // .then(function(res) {
        //     //object.assign([], categories);
        //     return Promise(resolve(object.assign([], res)));
        // })
        // .catch(function(err) {

        // });
    // return new Promise( ( resolve, reject ) => {
    //   setTimeout( () => {
    //     resolve( Object.assign( [], categories ) );
    //   }, delay );
    // });
  }

  static saveCategory( category ) {
    const cat = Object.assign( {}, category ); // to avoid manipulating object passed in.
    const config = {
      headers: { 
        'token': 'token-xxx',
        'companyId': '5790741257ec444416631b3b',
        'officeId': '5790753931381a4c0a95ba44'
      }
    };

    return axios.post('http://localhost:3090/category/create', cat);

    // return new Promise( ( resolve, reject ) => {
    //   setTimeout( () => {
    //     // Simulate server-side validation
    //     const minNameLength = 1;
    //     if ( category.name.length < minNameLength ) {
    //       reject(`Name must be at least ${minNameLength} characters.`);
    //     }

    //     if ( category.id ) {
    //       const existingCategoryIndex = categories.findIndex( a => a.id == category.id );
    //       category.splice( existingCategoryIndex, 1, category );
    //     } else {
    //       //Just simulating creation here.
    //       //The server would generate ids and watchHref's for new courses in a real app.
    //       //Cloning so copy returned is passed by value rather than by reference.
    //       category.id = generateId( category );
    //       categories.push( category );
    //     }

    //     resolve( category );
    //   }, delay );
    // } );
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