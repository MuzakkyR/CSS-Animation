import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdCalendarPage } from './gd-calendar';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    GdCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(GdCalendarPage),
    FlexLayoutModule,
  ],
  exports: [
    GdCalendarPage
  ]
})
export class GdCalendarPageModule {}