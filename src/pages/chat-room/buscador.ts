import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the PedigremetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {
  items;
  va_estado = '';
  myInput;
  macho = 0;
  hembra = 0;
  msj = 'Escoger macho';
  unirpedi = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authservice: AuthProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
  }

  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
    this.buscarporclave($event.target.value);
  }
  buscarporclave(clave) {
    if (!clave) {
      this.va_estado = '';
      this.items = [];
      return "";
    }
    if (clave.length < 2) {
      this.va_estado = '';
      this.items = [];
      return "";
    }
    this.va_estado = 'Buscando...';
    this.authservice.mascotasmetter(clave).subscribe((data) => {
      this.va_estado = '';
      this.items = data;
      if (!this.items.length) {
        this.va_estado = 'No se encontraron resultados';
      }
    },err=>{
      this.va_estado = 'Error en la busqueda, intentelo mas tarde';

    });
  }

  verpedigree(item) {
    this.viewCtrl.dismiss({success:true,data:item});
  }
  cancelar() {
    this.viewCtrl.dismiss({success:false});
  }


}
