import { Component } from '@angular/core';
//import { register } from 'swiper/element/bundle';

//register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public fotos: any[] = ['../../../../assets/img/1.jpg', '../../../../assets/img/2.jpg', '../../../../assets/img/3.png'];
  public pokeball: string = '../../../../assets/img/pokeball.png';
  constructor() { }
}
