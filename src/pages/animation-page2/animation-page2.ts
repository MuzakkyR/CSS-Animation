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
 * Generated class for the AnimationPage2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animation-page2',
  templateUrl: 'animation-page2.html',
  animations: [
    trigger('yaya', [
      state('show', style({
        background:'red'
      })),
  
      transition('* => show',[
        animate('2s ease'),
        style({
          top:'16px',
          left:'16px',
          transform:'translate(-16px, -16px)'
        })
      ]),
    ]),
  ]
})
export class AnimationPage2Page {

  firstParam:string;
  toggleAnimate:any = false;  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.ampas = "<div class='tul'>Mantab</div>"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimationPage2Page');
    this.firstParam = this.navParams.get("elemen");
    console.log(this.firstParam, "yayaya")
    this.toggleAnimate = true;               
  }


  togel(){
    this.toggleAnimate = !this.toggleAnimate;
    console.log(this.toggleAnimate)
  }
}
