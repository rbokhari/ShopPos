import axios from 'axios';

const  API_URL = 'http://localhost:3090'; 

class Api {

    static get(url) {
        const headers = {
            'CompanyId': localStorage.getItem('companyId'),
            'OfficeId': localStorage.getItem('officeId')
        };

        return axios({
            url: `${API_URL}/${url}`,
            method: 'get',
            headers: headers
        });
    }

    static post(url, data) {
        const headers = {
            'CompanyId': localStorage.getItem('companyId'),
            'OfficeId': localStorage.getItem('officeId')
        };
        const params = Object.assign( {}, data );
        return axios.post(`${API_URL}/${url}`, params);
    }

    static put(url, data) {
        const headers = {
            'CompanyId': localStorage.getItem('companyId'),
            'OfficeId': localStorage.getItem('officeId')
        };
        const params = Object.assign( {}, data );
        return axios.put(`${API_URL}/${url}`, params);
    }

}

export default Api;