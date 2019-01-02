import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SvgAnimationPage } from '../pages/svg-animation/svg-animation';
import { TextAnimationPage } from '../pages/text-animation/text-animation';
import { LogoPage } from '../pages/logo/logo';
import { TextGlowPage } from '../pages/text-glow/text-glow';
import { DuitPacarPage } from '../pages/duit-pacar/duit-pacar';
import { TextFlipPage } from '../pages/text-flip/text-flip';
import { LoadingBarPage } from '../pages/loading-bar/loading-bar';
import { AngularAnimationPage } from '../pages/angular-animation/angular-animation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = AngularAnimationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

