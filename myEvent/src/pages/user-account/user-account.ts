import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserEventsRegisteredPage } from '../user-events-registered/user-events-registered';
import { UserEventsBookmarkedPage } from '../user-events-bookmarked/user-events-bookmarked';
import { UserEventWebsitePage } from '../user-event-website/user-event-website';
import { UserEventUploadPage } from '../user-event-upload/user-event-upload';
import { UserEventFilesPage } from '../user-event-files/user-event-files';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { UploadFile } from '../../providers/firebase-data/file';
import { MyApp } from '../../app/app.component';
import { ToastOptions } from 'ionic-angular/components/toast/toast-options';

@IonicPage()
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {
  userInfo: Observable<any[]>;
  currentUpload: UploadFile;
  selectedFiles: FileList | null;
  editName: boolean= false;
  editSummary: boolean= false;

  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthenticationProvider,
                private upSvc: FirebaseDataProvider,
              private toast: ToastController) {

      
  // console.log(this.auth.currentUserId)
  this.userInfo = this.upSvc.getUserData(this.auth.currentUserId);
  console.log(this.auth.currentUserId);
  console.log(this.auth.authenticated);

  }

  ionViewCanEnter(): boolean{

      if(!this.auth.authenticated){
        console.log("No access");
        this.toastOptions = {
          message: 'Acess Denied! Must Login',
          position: 'top',
          duration: 3000,
          cssClass: 'styles'
        }
        this.toast.create(this.toastOptions).present();
      }

    return this.auth.authenticated;
   
  }



  changeUserName(name: string){
    this.auth.updateItem(this.auth.currentUserId, { name: name });
    this.editName = !this.editName;

    this.toastOptions = {
      message: 'Name Updated Successfully',
      position: 'top',
      duration: 2000,
      cssClass: 'styles'
    }
    this.toast.create(this.toastOptions).present();
  }


  logout(){
    this.auth.signOut();
    this.navCtrl.push(MyApp)

    this.toastOptions = {
      message: 'You have logged off successfully',
      position: 'top',
      duration: 3000,
      cssClass: 'styles'
    }
    this.toast.create(this.toastOptions).present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPage');
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }


  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new UploadFile(file.item(0));
      this.upSvc.pushNewImageUpload(this.currentUpload, this.auth.currentUserId);
      this.toastOptions = {
        message: 'Profile Picture Updated Successfully',
        position: 'top',
        duration: 2000,
        cssClass: 'styles'
      }
      this.toast.create(this.toastOptions).present();
    
    } else {
      console.error('No file found!');
    }
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
