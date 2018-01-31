import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventsBookmarkedPage } from './user-events-bookmarked';

@NgModule({
  declarations: [
    UserEventsBookmarkedPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventsBookmarkedPage),
  ],
})
export class UserEventsBookmarkedPageModule {}
