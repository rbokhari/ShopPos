import Api from './Api';

class DayApi {
    static getAllDays() {
        return Api.get('day');
    }

    static getDayById(id) {
        return Api.get(`day/${id}`);
    }

    static createDay () {    
        return Api.post('day/create');
    }

    static closeDay () {
        return Api.put(`day/close`);
    }

    static openDay (day) {
        return Api.get(`day/open`);
    }

    static printDay (dayId) {
        return Api.get(`day/${dayId}/print`);
    }

}

export default DayApi;