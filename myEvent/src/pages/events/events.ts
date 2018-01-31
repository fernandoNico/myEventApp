import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AngularFireDatabase } from 'angularfire2/database';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { EventInfoPage } from '../event-info/event-info';


@Component({
  selector: 'events-list',
  templateUrl: 'events.html'
})
export class EventsPage {

  eventsImages: Observable<any[]>;

  events: any[]
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventService: EventsDataProvider,
    private upSvc: FirebaseDataProvider
  ) {

    this.eventsImages = this.upSvc.getEventsImages();


    this.eventService.getEvents().subscribe(eventos => {
      if(eventos){
        this.events = eventos
        console.log(this.events)
      }
    });
  }
  getEventInfo(){
    this.navCtrl.push(EventInfoPage)
  }

  val(num: any){
    return(num)
  }



  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  vale: boolean = false;

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;



  







}
