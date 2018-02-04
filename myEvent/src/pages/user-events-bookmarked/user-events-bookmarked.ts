import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the UserEventsBookmarkedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-events-bookmarked',
  templateUrl: 'user-events-bookmarked.html',
})
export class UserEventsBookmarkedPage {
  userSavedEvents: Observable<any[]>;
  eventsImages: Observable<any[]>;
  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private toast: ToastController, 
    private upSvc: FirebaseDataProvider,
    private auth: AuthenticationProvider) {

      this.eventsImages = this.upSvc.getEventsImages();

      this.userSavedEvents = this.upSvc.getUserEvents(this.auth.currentUserId)
      .map(items => items.filter(item => item.bookmarked))
      .filter(items => items && items.length > 0);


  }

  val(num: any){
    return(num)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventsBookmarkedPage');
  }

  AttendEvent(keys: any){
    let attend = true;
    this.upSvc.updateEventRegister(keys, { attending: attend });

    this.toastOptions = {
      message: 'Attendance Registered Successfully',
      position: 'top',
      duration: 3000,  
    }
    this.toast.create(this.toastOptions).present();

    console.log(attend); 
  }


}
