import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvgAnimationPage } from './svg-animation';

@NgModule({
  declarations: [
    SvgAnimationPage,
  ],
  imports: [
    IonicPageModule.forChild(SvgAnimationPage),
  ],
})
export class SvgAnimationPageModule {}
