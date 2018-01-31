import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  authState: any = null;
  userRef: AngularFireObject<any>; 
  itemsRef: AngularFireList<any>;


  constructor(  public http: HttpClient, 
               private afAuth: AngularFireAuth,
               private db: AngularFireDatabase,) {

  this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
            console.log(this.authState)
    });

    this.itemsRef = db.list('/users')

    // console.log('Hello AuthenticationProvider Provider');
  }

  updateItem(key: string, value: any): void {
    this.itemsRef.update(key, value);
  }




  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : false;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

   // Returns current user display name or Guest
   get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else {
      return this.authState['displayName'] || 'User'
    }
  }


   //// Social Auth ////
   githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithRedirect(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    // this.router.navigate(['/'])
  }


  //// Helpers ////
  visible : boolean = false;
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      email: this.authState.email,
      // name: this.authState.displayName || 'User',
      uid: this.authState.uid,
      // photoURL: this.authState.photoURL || 'https://api.adorable.io/avatars/109/fire.png',
      publicProfile : this.visible
    }

    userRef.update(data)
      .catch(error => console.log(error));

  }





/////////////////
}
