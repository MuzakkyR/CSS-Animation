import { Component } from '@angular/core';

/**
 * Generated class for the ColorPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'color-picker',
  templateUrl: 'color-picker.html'
})
export class ColorPickerComponent {

  text: string;

  constructor() {
    console.log('Hello ColorPickerComponent Component');
    this.text = 'Hello World';
  }

}
