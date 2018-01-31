import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventWebsitePage } from './user-event-website';

@NgModule({
  declarations: [
    UserEventWebsitePage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventWebsitePage),
  ],
})
export class UserEventWebsitePageModule {}
