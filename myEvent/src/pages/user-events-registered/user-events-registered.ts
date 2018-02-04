import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EventInfoPage } from '../event-info/event-info';

@IonicPage()
@Component({
  selector: 'page-user-events-registered',
  templateUrl: 'user-events-registered.html',
})
export class UserEventsRegisteredPage {
  userEvents: Observable<any[]>;
  eventsImages: Observable<any[]>;
  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private upSvc: FirebaseDataProvider, private toast: ToastController,
    private auth: AuthenticationProvider) {

      this.eventsImages = this.upSvc.getEventsImages();

      this.userEvents = this.upSvc.getUserEvents(this.auth.currentUserId)
      .map(items => items.filter(item => item.attending))
      .filter(items => items && items.length > 0);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventsRegisteredPage');
  }

  updatePublicProfile(key: any , value: boolean){
    this.upSvc.updateEventRegister(key, { publicProfile: value });
    this.toastOptions = {
      message: 'Public Profile Update Successfully',
      position: 'top',
      duration: 2000,
    }
    this.toast.create(this.toastOptions).present();
   
  }

  getEventInfo(id){
   this.navCtrl.push(EventInfoPage,{id})
  }

  cancelAttendance(keys: any){
    let cancel = false;
    this.upSvc.updateEventRegister(keys, { attending: cancel });

    this.toastOptions = {
      message: 'Attendance Cancelled Successfully',
      position: 'top',
      duration: 2000,
    }
    this.toast.create(this.toastOptions).present();
    console.log(cancel); 
  }


  val(num: any){
    return(num)
  }

}
