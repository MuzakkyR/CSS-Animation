import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingBarPage } from './loading-bar';

@NgModule({
  declarations: [
    LoadingBarPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingBarPage),
  ],
})
export class LoadingBarPageModule {}
