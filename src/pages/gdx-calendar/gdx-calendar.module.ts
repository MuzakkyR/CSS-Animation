import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdxCalendarPage } from './gdx-calendar';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    GdxCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(GdxCalendarPage),
    FlexLayoutModule,
  ],
  exports: [
    GdxCalendarPage
  ]
})
export class GdxCalendarPageModule {}