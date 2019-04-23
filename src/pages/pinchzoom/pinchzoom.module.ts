import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinchzoomPage } from './pinchzoom';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    PinchzoomPage,
  ],
  imports: [
    IonicPageModule.forChild(PinchzoomPage),
    PinchZoomModule
  ],
})
export class PinchzoomPageModule {}
