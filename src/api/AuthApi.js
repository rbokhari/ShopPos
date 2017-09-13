import Api from './Api';

class AuthApi {

    static companyExists(name) {
        return Api.post('company/exists', { name });
    }

    static createAccount({ name, displayName, location, contactNo, email, password } ) {
        return Api.post('account/create', { name, displayName, location, contactNo, email, password });
    }

    // static createBranch( { name, displayName, location, officeNo, mobileNo, status }) {
    //     const branch = {
    //         name, displayName, location, officeNo, mobileNo, status
    //     };
    //     return Api.post('office/create', branch);
    // }
    static createBranch(newBranch) {
        // const branch = {
        //     name, displayName, location, officeNo, mobileNo, status
        // };
        return Api.post('office/create', newBranch);
    }

    static loadBranches() {
        return Api.get('office');
    }

    static activateBranch(id) {
        return Api.put('office/' + id + '/activate');
    }

    static signIn({email, password}) {
        return Api.post('signin', { email:email, password:password });
    }

    static userInfo() {
        return Api.get('user');
    }

    static changePassword(data) {
        console.log('change password data', data);
        return Api.post('user/changePassword', data);
    }
}

export default AuthApi; 