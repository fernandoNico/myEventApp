import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';

// import { Injectable } from '@angular/core';
// import { Http, HttpModule, Response } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
// import { Observable  } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/Observable/throw';
// import 'rxjs/add/operator/toPromise';
/*
  Generated class for the EventsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsDataProvider {

  apiKey = 'kH6Iob66dkqdMFQThCczyQ12057';


  constructor(public http: HttpClient) {
    console.log('Hello EventsDataProvider Provider');
  }


  getEvents() {
    return this.http.get<any[]>(('http://localhost:56647/api/Events'))
    .map(actions=>{
      return actions;
    }).catch(this.handleError);
  }

  getEventPostcode(postcode: string) {
    return this.http.get('https://api.getAddress.io/find/' + postcode + '?api-key=' + this.apiKey)
    .map(data=>{
      return data;
    }).catch(this.handleError);
  }


  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
  


}
