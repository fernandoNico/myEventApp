import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private upSvc: FirebaseDataProvider,
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
    // if(value){
    //   this.notify.update('Public profile = On Updated Successfully', 'success');
    // }else{
    //   this.notify.update('Public profile = Off Updated Successfully', 'danger');
    //}
   
  }

  getEventInfo(id){
   this.navCtrl.push(EventInfoPage,{id})
  }

  cancelAttendance(keys: any){
    let cancel = false;
    this.upSvc.updateEventRegister(keys, { attending: cancel });
    console.log(cancel); 
  }


  val(num: any){
    return(num)
  }

}
