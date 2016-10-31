import Api from './Api';

class DayApi {
  static getAllDays() {
    return Api.get('days');
  }

  static startDay (day) {    
      return Api.post('day/create');
  }

  static closeDay (day) {
      return Api.put(`day/${day._id}/close`);
  }

  static openDay (day) {
      return Api.get(`day/open`);
  }
  
}

export default DayApi;