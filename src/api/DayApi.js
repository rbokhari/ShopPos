import Api from './Api';

class DayApi {
  static getAllDays() {
    return Api.get('days');
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
  
}

export default DayApi;