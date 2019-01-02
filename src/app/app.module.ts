import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SvgAnimationPage } from '../pages/svg-animation/svg-animation';
import { TextAnimationPage } from '../pages/text-animation/text-animation';
import { LogoPage } from '../pages/logo/logo';
import { TextGlowPage } from '../pages/text-glow/text-glow';
import { DuitPacarPage } from '../pages/duit-pacar/duit-pacar';
import { TextFlipPage } from '../pages/text-flip/text-flip';
import { LoadingBarPage } from '../pages/loading-bar/loading-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SvgAnimationPage,
    TextAnimationPage,
    LogoPage,
    TextGlowPage,
    DuitPacarPage,
    TextFlipPage,
    LoadingBarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SvgAnimationPage,
    TextAnimationPage,
    LogoPage,
    TextGlowPage,
    DuitPacarPage,
    TextFlipPage,
    LoadingBarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
