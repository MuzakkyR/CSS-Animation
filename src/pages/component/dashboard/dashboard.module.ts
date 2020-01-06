import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { GdCalendarPageModule } from '../../gd-calendar/gd-calendar.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    GdCalendarPageModule
  ],
})
export class DashboardPageModule {}
