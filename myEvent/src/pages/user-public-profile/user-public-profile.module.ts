import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPublicProfilePage } from './user-public-profile';

@NgModule({
  declarations: [
    UserPublicProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserPublicProfilePage),
  ],
})
export class UserPublicProfilePageModule {}
