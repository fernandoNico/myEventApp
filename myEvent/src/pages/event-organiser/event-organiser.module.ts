import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventOrganiserPage } from './event-organiser';

@NgModule({
  declarations: [
    EventOrganiserPage,
  ],
  imports: [
    IonicPageModule.forChild(EventOrganiserPage),
  ],
})
export class EventOrganiserPageModule {}
