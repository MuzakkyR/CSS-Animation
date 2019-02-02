import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes } from '@angular/animations';
/**
 * Generated class for the SubscribeBtnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscribe-btn',
  templateUrl: 'subscribe-btn.html',
  animations:[
    trigger('fadingHorizontal', [
      transition('void => *',[
        style({
          opacity:0,
          width:0,
        }),
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('* => void',[
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
        style({ 
          opacity:0,
          width:0
        }),
      ]),
    ]),

    trigger('fadingVertical', [
      transition('void => *', [
        style({
          opacity: 0,
          height: 0
        }),
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('* => void', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
        style({
          opacity: 0,
          height: 0
        })
      ])
    ])
  ]
})
export class SubscribeBtnPage {

  nilai:boolean;  
  thank:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribeBtnPage');
  }

  toInput(){
    this.nilai = true;
    console.log(this.thank);
    
  }

  toThank(){
    this.thank = true;
    console.log(this.thank);
  } 

}
