import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector:'page-imagenes',
  templateUrl: 'imagenes.html'

})
export class ImagenesPage {

  nombre:string;
  imagenes;
  path;
     constructor(
    public viewCtrl: ViewController,
    public navp: NavParams
 
  ) {
     let datos= navp.get('datos')
     console.log(datos);
      this.nombre=datos.nombre;
      this.path=datos.path;
      this.imagenes=datos.imagenes;
  

/*    this.visitante=navp.get('visitante');
    this.nombre=datos.nombre;
    this.raza=datos.raza;
    this.sexo=((datos.sexo==1)?'Macho':'Hembra');
    this.color=datos.color
    this.microchip=datos.microchip;
    this.vender=datos.vender;
    this.precio=datos.precio;
 */ 
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


}