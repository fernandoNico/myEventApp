import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserEventWebsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-event-website',
  templateUrl: 'user-event-website.html',
})
export class UserEventWebsitePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  editWebsite: boolean= false;
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventWebsitePage');
  }

}
