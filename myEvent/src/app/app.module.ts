import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {  ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { EventsPage } from '../pages/events/events';
import { EventsDataProvider } from '../providers/events-data/events-data';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';
import { HttpModule } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventInfoPage } from '../pages/event-info/event-info';
import { EventAttendeesPage } from '../pages/event-attendees/event-attendees';
import { EventContentPage } from '../pages/event-content/event-content';
import { EventOrganiserPage } from '../pages/event-organiser/event-organiser';
import { EventSpeakersPage } from '../pages/event-speakers/event-speakers';




const firebaseConfig = {
    apiKey: "AIzaSyBuoYFbFdmv9oz8KHwGSnKAyf6wF5UHXgM",
    authDomain: "verificacion-2f34d.firebaseapp.com",
    databaseURL: "https://verificacion-2f34d.firebaseio.com",
    projectId: "verificacion-2f34d",
    storageBucket: "verificacion-2f34d.appspot.com",
    messagingSenderId: "542217649870",
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventsPage,
    EventInfoPage,
    EventAttendeesPage , 
    EventContentPage, 
    EventOrganiserPage, 
    EventSpeakersPage
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(),
    IonicModule.forRoot(MyApp),
    CommonModule,
    HttpClientModule,
    FormsModule,HttpModule ,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
     
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCA20_4EESP91_VCovXIqtbMWrRjWnuD8g'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventsPage,
    EventInfoPage,
    EventAttendeesPage , 
    EventContentPage, 
    EventOrganiserPage, 
    EventSpeakersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsDataProvider,
    AuthenticationProvider,
    FirebaseDataProvider,AngularFireDatabase
  ]
})
export class AppModule {}
