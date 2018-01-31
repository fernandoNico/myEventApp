import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserAccountPage } from '../user-account/user-account';

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

  userLogin: Boolean = true;
  userReg: Boolean = true;

  u: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthenticationProvider
    ) {

  }

  redirect(){
    this.navCtrl.push(UserAccountPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');

    this.u =  this.auth.currentUser;
    console.log(this.u);
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
  
    /// Anonymous Sign In
  
    // signInAnonymously() {
    //   this.auth.anonymousLogin()
    //     .then(() => this.afterSignIn());
    // }
  
  
    /// Shared
  
    private afterSignIn(): void {
      // Do after login stuff here, such router redirects, toast messages, etc.
      // this.router.navigate(['']);
      // this.notify.update('Welcome to Firestarter!!!', 'info');
      console.log("Login success!!!")
    }

}
