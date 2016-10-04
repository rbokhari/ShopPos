import axios from 'axios';

const  API_URL = 'http://localhost:3090'; 

class Api {
    
    static get(url) {
        const headers = {
            'authorization': localStorage.getItem('token'),
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
            'authorization': localStorage.getItem('token'),
            'CompanyId': localStorage.getItem('companyId'),
            'OfficeId': localStorage.getItem('officeId')
        };
        const params = Object.assign( {}, data );
        return axios.post(`${API_URL}/${url}`, params, { headers: headers });
    }

    static put(url, data) {
        const headers = {
            'authorization': localStorage.getItem('token'),
            'CompanyId': localStorage.getItem('companyId'),
            'OfficeId': localStorage.getItem('officeId')
        };
        console.info(`${API_URL}/${url}`);
        const params = Object.assign( {}, data );
        return axios.put(`${API_URL}/${url}`, params, { headers: headers });
    }

}

export default Api;