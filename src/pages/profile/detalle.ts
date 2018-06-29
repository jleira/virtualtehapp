import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ImagenesPage } from './imagenes';
import { SERVE_FILE_URI } from "../../config";
import { Storage } from "@ionic/storage";
import { AuthProvider } from '../../providers/auth/auth';
import {ChatRoomPage} from '../chat-room/chat-room';



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
  visitante: boolean;
  precio: number;
  vender: number;
  imagenesmascota = [];
  miid;
  path;
  datosmascota;
  constructor(
    public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController,
    private storage: Storage,
    public alertCtrl: AlertController,
    public toastc: ToastController,
    private authservice: AuthProvider,
    private loadingCtrl: LoadingController
  ) {

    this.visitante = true;

    let datos = navp.get('datos');
    this.datosmascota = datos;
    console.log(datos, 'sd');
    this.visitante = navp.get('visitante');
    this.nombre = datos.nombre;
    this.raza = datos.raza;
    this.sexo = ((datos.sexo == 1) ? 'Macho' : 'Hembra');
    this.color = datos.color
    this.microchip = datos.microchip;
    this.vender = datos.vender;
    this.precio = datos.precio;
    this.miid = datos.id_usuario;
    this.id = datos.id;//datos de la mascota
    this.path = `${SERVE_FILE_URI}storage/app/${this.miid}/${this.id}`;
    this.imagenesmascota = datos.imagenes;
    if (this.imagenesmascota) {
      this.imagenesmascota = datos.imagenes.split(',');
    }

    console.log('datos', datos);
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
      return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  imagenes(imagenes) {
    this.navCtrl.push(ImagenesPage, { datos: { imagenes: imagenes, path: this.path, nombre: this.nombre } });
  }
  buscarimagen(img) {
    let nimag = `${this.path}/${img[0]}`;
    return nimag;
  }

  abrirchat() {
    console.log('abrir chat', this.datosmascota);
    let alert = this.alertCtrl.create({
      title: `Mensaje para ${this.datosmascota.first_name} ${this.datosmascota.last_name}`,
      message: 'Este mensaje se enviara automaticamente ysera dirigido al chat',
      inputs: [
        {
          name: 'mensaje',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            if (!data.mensaje) {
              return this.toastmsj('el mensaje no puede estar vacio');
            } else {
              this.enviarmensaje(data.mensaje);
            }

          }

        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  toastmsj(mensaje = 'mensaje desconocido') {
    const toast = this.toastc.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  enviarmensaje(msj) {
    this.datosmascota.mensaje = msj;
    this.datosmascota.tipo = 1;
    this.datosmascota.mascota=JSON.stringify(this.datosmascota);
    this.authservice.enviarmensajemascota(this.datosmascota).subscribe(()=>{
      let usr={
        id:this.datosmascota.id_usuario
      };
      this.chat(usr);
    },err=>{
      this.toastmsj('Hubo un error, intentelo mas tarde');
    });
  }
  chat(user){
    this.storage.get('mydata').then(midata => {
      console.log('midata');
      let misdatos=JSON.parse(midata);
      this.navCtrl.setRoot(ChatRoomPage, { caso:1, miid: misdatos.id ,nickname: misdatos.correo, correo:misdatos.correo, user:user });  
    });
  
  }
  

}