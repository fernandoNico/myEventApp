import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastOptions } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserAccountPage } from '../user-account/user-account';
import { EventsPage } from '../events/events';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

// The code below shows how sign up and log in is performed
// Note that to do so the methods uses the authentication service provider

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

  toastOptionss: ToastOptions;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthenticationProvider, private toasts: ToastController) {
      this.u =  this.auth.currentUser;
  }

  redirect(){
    this.navCtrl.push(UserAccountPage);
  }

  ionViewDidEnter(){
    this.u =  this.auth.currentUser;
    console.log(this.u);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
    this.u =  this.auth.currentUser;
    console.log(this.u);
    
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
    public afterSignIn(): void {
      this.toastOptionss = {
        message: 'You have logged in successfully',
        position: 'top',
        duration: 3000,
        cssClass: 'styles'
      }
      this.toasts.create(this.toastOptionss).present();
      //this.navCtrl.push(MyApp);
    }

}
