import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UploadFile } from '../../providers/firebase-data/file';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';


// the code below shows how an user's files stored in firebase are retrieved using the user's ID

@IonicPage()
@Component({
  selector: 'page-user-event-files',
  templateUrl: 'user-event-files.html',
})
export class UserEventFilesPage {
  userUploads: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public upSvc: FirebaseDataProvider,
    private auth: AuthenticationProvider)  {

    // this.uploads = this.upSvc.getUserUploads(this.auth.currentUserId);
    this.userUploads = this.upSvc.getUserUploads(this.auth.currentUserId);
    console.log(this.userUploads)
  }

  deleteUpload(upload: UploadFile) {
    this.upSvc.deleteUpload(upload);
    // this.notify.update(name + ' Deleted Successfully', 'danger');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventFilesPage');
  }

}
