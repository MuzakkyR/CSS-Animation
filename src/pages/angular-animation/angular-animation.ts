import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition, } from '@angular/animations';

/**
 * Generated class for the AngularAnimationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-angular-animation',
  templateUrl: 'angular-animation.html',
  animations:[
    trigger('kananKiriOke',[
      state('kanan', style({
        transform: 'rotateY(-180deg)',
        backfaceVisibility: 'hidden'     
      })),
      state('kiri', style({
        transform: 'rotateY(0deg)'                    
      })),
      transition('kanan <=> kiri', [
        animate('2s') 
      ])
    ])
  ]
})
export class AngularAnimationPage {

  infiniteToggle=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AngularAnimationPage');
  }

  toggle(){
    this.infiniteToggle = !this.infiniteToggle;
  }

}
