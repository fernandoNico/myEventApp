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
  eId: number;
  eventData: any;
  addressList: any;
  vale: boolean = false;
      
  title: string = 'My first AGM project';
  lat: number ;
  lng: number ;
  zoom: number = 15;

  Street: string;
  eventCity: string;
  postocode: string;


  Eventdata: Observable<any[]>;
  userdata: Observable<any[]>;

  eventInfo:any;
  maint: string;


  constructor( public navParams: NavParams, 
    public navCtrl: NavController,
    private eventService: EventsDataProvider,
    private upSvc: FirebaseDataProvider,
    public authentication: AuthenticationProvider,) {

    // this.eventData = this.navParams.get('id');
    this.eId = this.navParams.get('id')
    console.log(this.eId)

    this.userdata = this.upSvc.getUserData(this.authentication.currentUserId);

   

    this.eventService.getEventById(this.eId).subscribe(eventos => {
      if(eventos){
        this.eventInfo = eventos
        let  myString = this.eventInfo.eventStreet;
        let splits = myString.split(',', );
        console.log(splits)
        this.Street = splits[0];
        this.eventCity = splits[5];
        this.postocode =  this.eventInfo.eventPostcode

        console.log(this.eventInfo)
        console.log(this.eventInfo.eventStreet)

        this.Eventdata = this.upSvc.getUserEvents(this.authentication.currentUserId)
        .map(items => items.filter(item => item.eventId == this.eventInfo.EventId))
        .filter(items => items && items.length > 0 );
        console.log(this.Eventdata);

        this.findAddress(this.postocode);
        

      }
    });

  }

    // this.eventInfo = this.eventService.getEventById(this.eId);
    // console.log(this.eventInfo)

    // console.log(this.eventData)
    // console.log(this.eventData.eventPostcode)
    // console.log(this.eventData.eventStreet)
 

   


    
      
    
    

    // console.log(splits[0]);
    // console.log(splits[5]);


  //}


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
  findAddress(p: string) {

    this.eventService.getEventPostcode(p).subscribe(
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
          this.lat = 51.678418;
          this.lng  = 7.809007;
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

  


  getEventMedia(eventid){
    console.log(eventid)
     this.navCtrl.push(EventContentPage,{eventid});

  }
  getEventSpeakers(){
     this.navCtrl.push(EventSpeakersPage)
  }
  getEventAttendees(eId){
     this.navCtrl.push(EventAttendeesPage,{eId})
  }
  getEventOrganiser(){
     this.navCtrl.push(EventOrganiserPage)
  }



  

}
