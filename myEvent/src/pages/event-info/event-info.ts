import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventContentPage } from '../event-content/event-content';
import { EventOrganiserPage } from '../event-organiser/event-organiser';
import { EventAttendeesPage } from '../event-attendees/event-attendees';
import { EventSpeakersPage } from '../event-speakers/event-speakers';
import { EventsDataProvider } from '../../providers/events-data/events-data';
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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

  eventData: any;
  addressList: any;
  vale: boolean = false;
      
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 15;

  eventStreet: string;
  eventCity: string;


  Eventdata: Observable<any[]>;
  userdata: Observable<any[]>;



  constructor( public navParams: NavParams, 
    public navCtrl: NavController,
    private eventService: EventsDataProvider,
    private upSvc: FirebaseDataProvider,
    public authentication: AuthenticationProvider,) {

    this.eventData = this.navParams.get('eventos');
    console.log(this.eventData)
    console.log(this.eventData.eventPostcode)
    console.log(this.eventData.eventStreet)
    this.findAddress();

    var myString = this.eventData.eventStreet;
    var splits = myString.split(',', );

    this.eventStreet = splits[0];
    this.eventCity = splits[5];


    this.userdata = this.upSvc.getUserData("zpicpKtAjIdUlPaPYmcg7HXoVyA2");
      
    
    this.Eventdata = this.upSvc.getUserEvents("zpicpKtAjIdUlPaPYmcg7HXoVyA2")
      .map(items => items.filter(item => item.eventId ==this.eventData.EventId))
      .filter(items => items && items.length > 0 );
      console.log(this.Eventdata);

    // console.log(splits[0]);
    // console.log(splits[5]);


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoPage');
  }


  ///

  AttendEvent(value: string, eventTitle: string, eventStartDate: string,
    eventEndDate: string, eventStreet: string, eventPostcode: string){ 
    let v = String(value);
    console.log(v); 
    this.upSvc.AttendEvent(v, eventTitle, eventStartDate, eventEndDate, eventStreet, eventPostcode );
 
  }

  bookmarkEvent(value: string, eventTitle: string, eventStartDate: string,
    eventEndDate: string, eventStreet: string, eventPostcode: string){ 
    let va = String(value);
    console.log(va); 
    this.upSvc.bookmarkEvent(va, eventTitle, eventStartDate, eventEndDate, eventStreet, eventPostcode);
  }


  cancelAttendance(keys: any){
    let cancel = false;
    this.upSvc.updateEventRegister(keys, { attending: cancel });
  }

  updateAttendance(keys: any){
    let attend = true;
    this.upSvc.updateEventRegister(keys, { attending: attend });
  }

  bookmark(keys: any){
    let bookmark = true;
    this.upSvc.updateEventRegister(keys, { bookmarked: bookmark });
  }





  //
  findAddress() {

    this.eventService.getEventPostcode(this.eventData.eventPostcode).subscribe(
      (Data)=>{
        if (Data == null) {
          console.log('Postcode do not exist!');
        }else{
        this.addressList =  Data;
        this.lat = this.addressList.latitude;
        this.lng = this.addressList.longitude;
        console.log(this.addressList.latitude);
        console.log(this.addressList.longitude);
        
        }
    },
        (error) => {
          console.log('Problem with the service');
          console.log(error);
        }
    );
  }

 

    //     this.lat =  this.AddressList.latitude;
    //     this.lng =  this.AddressList.longitude;
    //     console.log(this.AddressList);
    //     console.log(this.lat);
    //     console.log(this.lng);

  


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



  

}
