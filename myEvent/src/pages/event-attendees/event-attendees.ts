import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { UserPublicProfilePage } from '../user-public-profile/user-public-profile';
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';



@IonicPage()
@Component({
  selector: 'page-event-attendees',
  templateUrl: 'event-attendees.html',
})
export class EventAttendeesPage {
  allUsersdata: Observable<any[]>;
  eventAttendees: Observable<any[]>;
  eId: number
  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController, public auth: AuthenticationProvider,
    public navParams: NavParams,private toast: ToastController,
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

  ionViewCanEnter(){

    if(!this.auth.authenticated){
      console.log("No access");
      this.toastOptions = {
        message: 'Acess Denied! Must Login',
        position: 'top',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'Close'
      }
      this.toast.create(this.toastOptions).present();
    }

  return this.auth.authenticated;
 
}



  getUserPublicProfile(userId){
    // console.log(userId)
    this.navCtrl.push(UserPublicProfilePage,{userId})
  }
}
