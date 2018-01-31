import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserEventsRegisteredPage } from '../user-events-registered/user-events-registered';
import { UserEventsBookmarkedPage } from '../user-events-bookmarked/user-events-bookmarked';
import { UserEventWebsitePage } from '../user-event-website/user-event-website';
import { UserEventUploadPage } from '../user-event-upload/user-event-upload';
import { UserEventFilesPage } from '../user-event-files/user-event-files';



@IonicPage()
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {

  selectedFiles: FileList | null;
  editName: boolean= false;
  editSummary: boolean= false;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public auth: AuthenticationProvider,
    private modal : ModalController) {
  }
  logout(){
    this.auth.signOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPage');
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }
  
  
  
  
  
  getRegisteredEvents(){
   this.navCtrl.push(UserEventsRegisteredPage)
  }

  getBookmarkedEvents(){
    this.navCtrl.push(UserEventsBookmarkedPage)
  }

  getUserFiles(){
    this.navCtrl.push(UserEventFilesPage)
  }

  UploadFiles(){
   this.navCtrl.push(UserEventUploadPage) 
  }

  getUserWebsite(){
    this.navCtrl.push(UserEventWebsitePage)
  }

  
  
}
