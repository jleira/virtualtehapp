import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewPedigreePage} from './new-pedigree';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  newpedigree(caso){
    this.navCtrl.push(NewPedigreePage,{caso:caso});
  }

}
