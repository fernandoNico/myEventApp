import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserPublicProfilePage } from '../user-public-profile/user-public-profile';

/**
 * Generated class for the EventAttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-attendees',
  templateUrl: 'event-attendees.html',
})
export class EventAttendeesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAttendeesPage');
  }


  getUserPublicProfile(){
    this.navCtrl.push(UserPublicProfilePage)
  }
}
