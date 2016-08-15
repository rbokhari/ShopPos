import Api from './Api';

class AuthApi {

    static companyExists(name) {
        return Api.post('company/exists', { name });
    }

    static createAccount({ name, displayName, location, contactNo, email, password } ) {
        return Api.post('account/create', { name, displayName, location, contactNo, email, password });
    }

    static createBranch( { name, displayName, location, officeNo, mobileNo, status }) {
        const branch = {
            name, displayName, location, officeNo, mobileNo, status
        };
        return Api.post('office/create', branch);
    }

    static loadBranches() {
        return Api.get('office');
    }

    static signIn({email, password}) {
        return Api.post('signin', { email:email, password:password });
    }

    static userInfo() {
        return Api.get('user');
    }
}

export default AuthApi; 