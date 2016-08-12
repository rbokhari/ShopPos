import Api from './Api';

class AuthApi {

    static companyExists(name) {
        return Api.post('company/exists', { name });
    }

    static createAccount({ name, displayName, location, contactNo, email, password } ) {
        return Api.post('account/create', { name, displayName, location, contactNo, email, password });
    }

   static signIn({email, password}) {
    return Api.post('signin', { email:email, password:password });
  }
}

export default AuthApi; 