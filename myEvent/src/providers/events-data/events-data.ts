import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';

// The code below performs web api calls to retrievd data stored in the sql server(notice the end points)
//  As well, here api call are executed(Address)

@Injectable()
export class EventsDataProvider {

  //apiKey = 'vXOz9FPWLUa_3kJnSc8U1Q12813';
  apiKey = '8_zbUjYH70atdEX28Ac5Ww12858';

  constructor(public http: HttpClient) {
    console.log('Hello EventsDataProvider Provider');
  }


  getEvents() {
    return this.http.get<any[]>(('http://localhost:56647/api/Events'))
    .map(actions=>{
      return actions;
    }).catch(this.handleError);
  }

  getEventById(id: number) {
    return this.http.get('http://localhost:56647/api/Events/' + id )
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
