import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypewriterPage } from './typewriter';

@NgModule({
  declarations: [
    TypewriterPage,
  ],
  imports: [
    IonicPageModule.forChild(TypewriterPage),
  ],
})
export class TypewriterPageModule {}
