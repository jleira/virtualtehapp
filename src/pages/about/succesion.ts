import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-succesion',
  templateUrl: 'succesion.html'
})
export class SuccesionPage {
  contador;
  linasucesion;
  sucesores;
  nombres;
  $;
  constructor(public navCtrl: NavController, private viewCtrl:ViewController, private navparams:NavParams) {
    this.nombres= this.navparams.get('nombres');
    console.log(this.nombres);

}

  cancelar(){
      this.viewCtrl.dismiss({successs:false});
  }

  guardar(datos){
    let count =Object.keys(datos).length;
    console.log(datos,count);
    let item;
    item=[];
    this.nombres.forEach(element => {
        item.push({nombre:datos['padre'+element]});
        item.push({nombre:datos['madre'+element]});
    });
    this.viewCtrl.dismiss({newitems:item,successs:true});


  }
}
