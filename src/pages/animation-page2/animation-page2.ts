import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  widthShape:any;
  heightShape:any;  
  topShape:any;
  leftShape:any;
  getParent:any; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public elref:ElementRef,
  public render:Renderer2) {

      this.getParent = this.elref.nativeElement;
      console.log(this.getParent);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimationPage2Page');
    this.firstParam = this.navParams.get("elemen");
    this.widthShape = this.navParams.get("width");
    this.heightShape = this.navParams.get("height");
    this.topShape = this.navParams.get("top");    
    this.leftShape = this.navParams.get("left");    
    
    this.render.setStyle(this.getParent, "width", this.widthShape + "px");
    this.render.setStyle(this.getParent, "height", this.heightShape + "px");
    this.render.setStyle(this.getParent, "top", this.topShape + "px");
    this.render.setStyle(this.getParent, "left", this.leftShape + "px");
  }
}
