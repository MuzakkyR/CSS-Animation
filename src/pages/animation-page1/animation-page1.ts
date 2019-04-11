import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
/**
 * Generated class for the AnimationPage1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animation-page1',
  templateUrl: 'animation-page1.html',
  animations: [
    trigger('yaya', [
      state('leave', style({
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)'
      })),
  
      transition('leave => void',[
        animate('2s ease'),
        style({
          top:'16px',
          left:'16px',
          transform:'translate(-16px, -16px)'
        })
      ]),

      state('open', style({
        marginTop:'100px'
      })),
  
      transition('void => open',[
        animate('200ms ease')
      ])
    ]),
  ]
})
export class AnimationPage1Page {

  card:any;
  toggleAnimate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toggleAnimate = false;
    
    console.log(this.toggleAnimate, " lol ")
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimationPage1Page');
  }

  toPage2(){
    this.toggleAnimate = true;
    this.card = document.getElementById("card").outerHTML;
    this.navCtrl.push("AnimationPage2Page", {elemen: this.card}, {animate:false})
  }
}
