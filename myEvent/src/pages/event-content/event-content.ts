import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UploadFile } from '../../providers/firebase-data/file';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';

// The code below shows the files uploaded associated to a conference

@IonicPage()
@Component({
  selector: 'page-event-content',
  templateUrl: 'event-content.html',
})
export class EventContentPage {
  Eventuploads: Observable<UploadFile[]>;
  Id: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private upSvc: FirebaseDataProvider ){

    this.Id = this.navParams.get('eventid');
    console.log(this.Id)
    this.Eventuploads = this.upSvc.getUploads(this.Id.toString());
  }

  deleteUpload(upload: UploadFile) {
    this.upSvc.deleteUpload(upload);
    // this.notify.update(name + ' Deleted Successfully', 'danger');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventContentPage');
  }

}
