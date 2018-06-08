import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ImagenesPage } from '../../pages/profile/imagenes';
import { SERVE_FILE_URI } from "../../config";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the AccesoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accesorios',
  templateUrl: 'accesorios.html',
})
export class AccesoriosPage {
    id;
    nombre;
    descripcion;
    visitante:boolean;
    precio:number;
    imagenesp=[];
    miid;
    categoria;
    path;
  constructor( public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController,
    private storage:Storage) {
      this.visitante=true;
    let datos = navp.get('datos');
    console.log(datos,'sd');
    this.visitante=navp.get('visitante');
    this.nombre=datos.nombre;
    this.descripcion=datos.descripcion;
    this.precio=datos.precio;
    this.categoria=datos.categoria;
    this.miid=datos.usuario_id;
    this.id=datos.id;//datos de la mascota
    this.path=`${SERVE_FILE_URI}storage/app/productos/${this.miid}/${this.id}`;
    this.imagenesp=datos.imagenes;
    if(this.imagenesp){
      this.imagenesp=datos.imagenes.split(',');
      
    }
    console.log('datos',datos);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccesoriosPage');
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
