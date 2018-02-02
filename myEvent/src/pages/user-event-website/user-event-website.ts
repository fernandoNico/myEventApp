import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
  uploads: Observable<any[]>;

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private upSvc: FirebaseDataProvider,
    public auth: AuthenticationProvider) {

    this.uploads = this.upSvc.getUserData(this.auth.currentUserId);
  }
  editWebsite: boolean= false;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventWebsitePage');
  }

  UserWebsite(value: string){
    this.auth.updateItem(this.auth.currentUserId, { website: value });
    this.editWebsite = !this.editWebsite;
    // this.notify.update(' Website Updated Successfully', 'success');
  }



}
