import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextFlipPage } from './text-flip';

@NgModule({
  declarations: [
    TextFlipPage,
  ],
  imports: [
    IonicPageModule.forChild(TextFlipPage),
  ],
})
export class TextFlipPageModule {}
