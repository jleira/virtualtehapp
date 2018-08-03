import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PedigremettereditPage } from './pedigremetteredit';

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
  macho = 0;
  hembra = 0;
  msj = 'Escoger macho';
  unirpedi = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authservice: AuthProvider,
    public modalCtrl: ModalController) {
  }

  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
    this.buscarporclave($event.target.value);
  }
  buscarporclave(clave) {
    console.log('clave',clave);
    if (!clave) {
      this.items = null;
      return "";
    }
    if (clave.length < 2) {
      this.items = null;
      return "";
    }

    if (this.unirpedi) {
      if (this.macho) {
        this.authservice.mascotasmetterhembra(clave).subscribe((data) => {
          this.items = data;
          console.log('encontro');
        },err=>{
          console.log('eror no encontro');
                    console.log(err);
        });
      } else {
        this.authservice.mascotasmettermacho(clave).subscribe((data) => {
          this.items = data;
        },err=>{
          console.log('eror no encontro');
                    console.log(err);
        });
      }
    } else {
      this.authservice.mascotasmetter(clave).subscribe((data) => {
        this.items = data;
      },err=>{
        console.log('eror no encontro');
                  console.log(err);
      });

    }
  }

  verpedigree(item) {
    if (this.unirpedi) {
      if (this.macho) {
        this.hembra = parseInt(item.id);
        this.myInput = '';
        this.items = null;
      } else {
        this.msj = 'Escoger Hembra';
        this.macho = parseInt(item.id);
        this.myInput = '';
        this.items = null;
      }
      if (this.macho && this.hembra) {
        this.authservice.crucepedigreemetter(this.macho, this.hembra).subscribe((data) => {
          this.modalCtrl.create(PedigremettereditPage, { data: data, unirp: true }).present();
          this.cancelarunir();
        });
      }

    } else {
      this.authservice.pedigreemetter(parseInt(item.id)).subscribe((data) => {
        this.modalCtrl.create(PedigremettereditPage, { data: data, unirp: false }).present();
      });
    }

  }
  nuevo() {
    let data = {
      root_canine_1: {
        "level": "0",
        "id": "454",
        "img": "/assets/placeholder2.png",
        "nombre": "",
        "race": "",
        "sex": "1"
      },
      canes: []
    }
    this.modalCtrl.create(PedigremettereditPage, { data: data, unirp: false }).present();
  }

  unir() {
    this.unirpedi = true;
  }
  cancelarunir() {
    this.macho = 0;
    this.hembra = 0;
    this.msj = 'Escoger macho';
    this.unirpedi = false;
    this.myInput = '';
    this.items = null;

  }
}
