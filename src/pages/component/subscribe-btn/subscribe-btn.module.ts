import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscribeBtnPage } from './subscribe-btn';

@NgModule({
  declarations: [
    SubscribeBtnPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscribeBtnPage),
  ],
})
export class SubscribeBtnPageModule {}
