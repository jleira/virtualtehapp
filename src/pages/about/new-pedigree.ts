import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-pedigree',
  templateUrl: 'new-pedigree.html'
})
export class NewPedigreePage {

  constructor(public navCtrl: NavController, public navparams:NavParams, public viewCtrl:ViewController) {
    console.log(this.navparams.get('caso'));
  }

  cancelar(){
      this.viewCtrl.dismiss();
  }
}
