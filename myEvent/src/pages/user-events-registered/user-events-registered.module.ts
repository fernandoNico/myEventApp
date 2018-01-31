import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventsRegisteredPage } from './user-events-registered';

@NgModule({
  declarations: [
    UserEventsRegisteredPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventsRegisteredPage),
  ],
})
export class UserEventsRegisteredPageModule {}
