import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventContentPage } from './event-content';

@NgModule({
  declarations: [
    EventContentPage,
  ],
  imports: [
    IonicPageModule.forChild(EventContentPage),
  ],
})
export class EventContentPageModule {}
