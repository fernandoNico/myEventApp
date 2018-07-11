import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { EventInfoPage } from '../event-info/event-info';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

// The code below generates the code required to show all available conferences


@Component({
  selector: 'events-list',
  templateUrl: 'events.html'
})
export class EventsPage {

  eventsImages: Observable<any[]>;
  userSavedEvents: Observable<any[]>;

  events: any[]
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventService: EventsDataProvider,
    private upSvc: FirebaseDataProvider,
    public auth: AuthenticationProvider
  ) {

    this.eventsImages = this.upSvc.getEventsImages();

    this.userSavedEvents = this.upSvc.getUserEvents(this.auth.currentUserId)
      .map(items => items.filter(item => item.attending || item.bookmarked ))
      .filter(items => items && items.length > 0  );
      console.log(this.userSavedEvents);

    this.eventService.getEvents().subscribe(eventos => {
      if(eventos){
        this.events = eventos
        console.log(this.events)
      }
    });
  }
  getEventInfo(id){
   this.navCtrl.push(EventInfoPage, {id})
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
