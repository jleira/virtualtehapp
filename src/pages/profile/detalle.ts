import { Component } from '@angular/core';
import { ViewController, NavParams,NavController } from 'ionic-angular';
import { ImagenesPage } from './imagenes';


@Component({

  templateUrl: 'detalles.html'

})
export class DetallesPage {

    nombre;
    color;
    raza;
    sexo;
    microchip;
    visitante:boolean;
    precio:number;
    vender:number;
  constructor(
    public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController
 
  ) {
    this.visitante=true;

    let datos = navp.get('datos');
    this.visitante=navp.get('visitante');
    this.nombre=datos.nombre;
    this.raza=datos.raza;
    this.sexo=((datos.sexo==1)?'Macho':'Hembra');
    this.color=datos.color
    this.microchip=datos.microchip;
    this.vender=datos.vender;
    this.precio=datos.precio;
    console.log('datos',datos);
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

imagenes(){
  this.navCtrl.push(ImagenesPage);
}

}