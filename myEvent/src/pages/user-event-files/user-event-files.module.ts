import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventFilesPage } from './user-event-files';

@NgModule({
  declarations: [
    UserEventFilesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventFilesPage),
  ],
})
export class UserEventFilesPageModule {}
