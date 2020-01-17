import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdxTablePage } from './gdx-table';

@NgModule({
  declarations: [
    GdxTablePage,
  ],
  imports: [
    IonicPageModule.forChild(GdxTablePage),
  ],
  exports: [
    GdxTablePage
  ]
})
export class GdxTablePageModule {}
