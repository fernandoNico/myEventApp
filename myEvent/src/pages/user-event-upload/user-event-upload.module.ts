import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventUploadPage } from './user-event-upload';

@NgModule({
  declarations: [
    UserEventUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventUploadPage),
  ],
})
export class UserEventUploadPageModule {}
