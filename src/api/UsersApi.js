import Api from './Api';

class UsersApi {
  static getAllUsers() {
    return Api.get('users');
  }

  static saveUsers( user ) {
      console.log("users", user);
    return Api.post('users/create', user);
  }

}

export default UsersApi;