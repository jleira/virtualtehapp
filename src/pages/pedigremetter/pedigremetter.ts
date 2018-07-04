import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../providers/auth/auth';
import {PedigremettereditPage} from './pedigremetteredit';

/**
 * Generated class for the PedigremetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedigremetter',
  templateUrl: 'pedigremetter.html',
})
export class PedigremetterPage {
  items;
  myInput;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authservice:AuthProvider) {
  }

  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
      this.buscarporclave($event.target.value);        
  }
  buscarporclave(clave) {
    if(!clave){
      return "";
    }
    if(clave.length<2){
      return "";
    }
    this.authservice.mascotasmetter(clave).subscribe((data)=>{ 
      this.items=data;
    });
  }

  verpedigree(item){
    this.authservice.pedigreemetter(parseInt(item.id)).subscribe((data)=>{
      this.navCtrl.push(PedigremettereditPage,{data:data})
     
    });
  }

}
