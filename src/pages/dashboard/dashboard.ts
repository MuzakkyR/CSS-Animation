import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  textPage:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.textPage = [
      {
        name:"Transparant Background",
        link:"HomePage"
      },
      {
        name:"Switch Side Text",
        link:"DuitPacarPage"
      },
      {
        name:"Wavy Background",
        link:"TextAnimationPage"
      },
      {
        name:"Flip Text",
        link:"TextFlipPage"
      },
      {
        name:"Glowing Text",
        link:"TextGlowPage"
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  toLink(url:string){
    this.navCtrl.push(url);
  }

}
