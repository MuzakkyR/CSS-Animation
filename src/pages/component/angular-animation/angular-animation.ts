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
    trigger('byClick', [
      state('bukaBox1', style({
        top:'-150px',
        left:'-70px',
        opacity:'1'
      })),
      state('bukaBox2', style({
        top:'-150px',
        left:'0px',
        opacity:'1',
      })),      
      state('bukaBox3', style({
        top:'-150px',
        left:'70px',
        opacity:'1',
      })),
      state('tutupBox', style({
        top:'0',
        left:'0',
        opacity:'0',        
      })),
      transition('* <=> tutupBox',[
        animate('200ms cubic-bezier(1, 0, 0, 1)')
      ])
    ])
  ]
})
export class AngularAnimationPage {

  isByClick : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isByClick = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AngularAnimationPage');
  }

  toggle(){
    this.isByClick = !this.isByClick;
  }

}
