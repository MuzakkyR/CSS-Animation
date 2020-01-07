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

  linkPage:any = [];
  startDate:any = 'belum dipilih';
  endDate:any = 'belum dipilih';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.linkPage = [
      {
        title:"Text Animation",
        content:[
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
          },
          {
            name:"Typewriter Effect",
            link:"TypewriterPage"
          }
        ]
      },
      {
        title:"Component",
        content:[
          {
            name:"Loading Bars",
            link:"LoadingBarPage"
          },
          {
            name:"Subscriber Button",
            link:"SubscribeBtnPage"
          },
          {
            name:"Pinch Zoom",
            link:"PinchzoomPage"
          }
        ]
      },
      {
        title:"SVG Animation",
        content:[
          {
            name:"Arrow",
            link:"SvgAnimationPage"
          },
        ]
      },
      {
        title:"Page Transition",
        content:[
          {
            name:"Page 1",
            link:"AnimationPage1Page"
          }
        ]
      }
    ]
  }

  getDate(event){
    console.log("jalan")
    this.startDate = event;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  toLink(url:string){
    this.navCtrl.push(url);
  }

}
