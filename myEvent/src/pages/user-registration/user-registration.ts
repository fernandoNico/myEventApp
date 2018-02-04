import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastOptions } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserAccountPage } from '../user-account/user-account';
import { EventsPage } from '../events/events';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the UserRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html',
})
export class UserRegistrationPage {

  UserEmail:string;
  UserPassword:string;

  userLogin: Boolean = true;
  userReg: Boolean = true;

  u: any;

  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthenticationProvider, private toast: ToastController) {
  }

  redirect(){
    this.navCtrl.push(UserAccountPage);
  }

  ionViewWillEnter(){
    this.u =  this.auth.currentUser;
    console.log(this.u);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');

    
  }

  // email login
  userlogin() {
    this.auth.emailLogin(this.UserEmail, this.UserPassword).then(() => this.afterSignIn());

  }

  // email sig up
  userSignUp() {
  this.auth.emailSignUp(this.UserEmail, this.UserPassword).then(() => this.afterSignIn());
  }




  logout() {
    this.auth.signOut();
  }

    /// Social Login

    signInWithGithub(): void {
      this.auth.githubLogin()
      .then(() => this.afterSignIn());
    }
  
    signInWithGoogle(): void {
      this.auth.googleLogin()
        .then(() => this.afterSignIn());
    }
  
    signInWithFacebook(): void {
      this.auth.facebookLogin()
        .then(() => this.afterSignIn());
    }
  
    signInWithTwitter(): void {
      this.auth.twitterLogin()
        .then(() => this.afterSignIn());
    }
  
    /// Shared
    private afterSignIn(): void {
      this.toastOptions = {
        message: 'You have logged in successfully',
        position: 'top',
        duration: 3000,
        //  toastOptions: ToastOptions;
        // this.toast.create(this.toastOptions).present();
        // private toast: ToastController
      }
      this.toast.create(this.toastOptions).present();
      this.navCtrl.push(MyApp,);
    }

}
