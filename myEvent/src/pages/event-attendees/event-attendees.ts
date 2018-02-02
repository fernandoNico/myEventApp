import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserPublicProfilePage } from '../user-public-profile/user-public-profile';
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';



@IonicPage()
@Component({
  selector: 'page-event-attendees',
  templateUrl: 'event-attendees.html',
})
export class EventAttendeesPage {
  allUsersdata: Observable<any[]>;
  eventAttendees: Observable<any[]>;
  eId: number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private upSvc: FirebaseDataProvider ){

    this.eId = this.navParams.get('eId');
    console.log(this.eId);
    
    this.allUsersdata = this.upSvc.getAllUsersData();

    this.eventAttendees = this.upSvc.getEventAttendees(this.eId.toString())
    .map(items => items.filter(item => item.publicProfile))
    .filter(items => items && items.length > 0 );
    console.log(this.eventAttendees);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAttendeesPage');
  }

  getUserPublicProfile(userId){
    // console.log(userId)
    this.navCtrl.push(UserPublicProfilePage,{userId})
  }
}
