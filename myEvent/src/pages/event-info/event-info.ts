import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventContentPage } from '../event-content/event-content';
import { EventOrganiserPage } from '../event-organiser/event-organiser';
import { EventAttendeesPage } from '../event-attendees/event-attendees';
import { EventSpeakersPage } from '../event-speakers/event-speakers';

/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoPage');
  }

  getEventMedia(){
     this.navCtrl.push(EventContentPage)
  }
  getEventSpeakers(){
     this.navCtrl.push(EventSpeakersPage)
  }
  getEventAttendees(){
     this.navCtrl.push(EventAttendeesPage)
  }
  getEventOrganiser(){
     this.navCtrl.push(EventOrganiserPage)
  }



  vale: boolean = false;
      
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

}
