import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';

// The code below generates the data required to show an user public profile.
// Notice that the data is retrieved using the users's ID


@IonicPage()
@Component({
  selector: 'page-user-public-profile',
  templateUrl: 'user-public-profile.html',
})
export class UserPublicProfilePage {

  userdata: Observable<any[]>;
  userUploads: Observable<any[]>;

  profileId: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private upSvc: FirebaseDataProvider ) {

    this.profileId = this.navParams.get('userId');
    console.log(this.profileId);

    this.userdata = this.upSvc.getUserData(this.profileId);
    this.userUploads = this.upSvc.getUserUploads(this.profileId);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPublicProfilePage');
  }

}
