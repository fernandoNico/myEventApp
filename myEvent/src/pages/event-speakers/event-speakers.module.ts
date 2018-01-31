import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSpeakersPage } from './event-speakers';

@NgModule({
  declarations: [
    EventSpeakersPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSpeakersPage),
  ],
})
export class EventSpeakersPageModule {}
