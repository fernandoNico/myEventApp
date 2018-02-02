import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadFile } from '../../providers/firebase-data/file';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AuthenticationProvider } from '../../providers/authentication/authentication';



@IonicPage()
@Component({
  selector: 'page-user-event-upload',
  templateUrl: 'user-event-upload.html',
})
export class UserEventUploadPage {
  selectedFiles: FileList | null;
  currentUpload: UploadFile;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthenticationProvider,
     private upSvc: FirebaseDataProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventUploadPage');
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }
  

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new UploadFile(file.item(0));
      this.upSvc.pushUpload(this.currentUpload, this.auth.currentUserId);
      // this.notify.update( this.currentUpload.file.name + ' Uploaded Successfully', 'success');
    } else {
      console.error('No file found!');
    }
  }

}
