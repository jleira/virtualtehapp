import { Component } from '@angular/core';
import { ViewController, NavParams,NavController } from 'ionic-angular';
import { ImagenesPage } from './imagenes';
import { SERVE_FILE_URI } from "../../config";
import { Storage } from "@ionic/storage";



@Component({

  templateUrl: 'detalles.html'

})
export class DetallesPage {
    id;
    nombre;
    color;
    raza;
    sexo;
    microchip;
    visitante:boolean;
    precio:number;
    vender:number;
    imagenesmascota=[];
    miid;
    path;
  constructor(
    public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController,
    private storage:Storage
  ) {
    
    this.visitante=true;

    let datos = navp.get('datos');
    console.log(datos,'sd');
    this.visitante=navp.get('visitante');
    this.nombre=datos.nombre;
    this.raza=datos.raza;
    this.sexo=((datos.sexo==1)?'Macho':'Hembra');
    this.color=datos.color
    this.microchip=datos.microchip;
    this.vender=datos.vender;
    this.precio=datos.precio;
    this.miid=datos.idusuario;
    this.id=datos.id;
    this.path=`${SERVE_FILE_URI}storage/app/${this.miid}/${this.id}`;
    this.imagenesmascota=datos.imagenes;
    if(this.imagenesmascota){
      this.imagenesmascota=datos.imagenes.split(',');
    }
    
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

imagenes(imagenes){
  this.navCtrl.push(ImagenesPage,{datos:{imagenes:imagenes,path:this.path,nombre:this.nombre}});
}
buscarimagen(img){
  let nimag=`${this.path}/${img[0]}`;
  return nimag;
}

}