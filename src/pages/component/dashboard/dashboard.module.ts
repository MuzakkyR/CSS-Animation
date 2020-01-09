import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { GdxCalendarPageModule } from '../../gdx-calendar/gdx-calendar.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    GdxCalendarPageModule
  ],
})
export class DashboardPageModule {}
