import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsPage } from '../events/events';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userLog: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,) {

  }

  ionViewDidEnter(){
    
    this.userLog = this.navParams.get('log');

    console.log(this.userLog);
  }
  createEvent(){
    this.navCtrl.push(EventsPage)
  }
}
