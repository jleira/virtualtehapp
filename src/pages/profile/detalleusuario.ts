import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ImagenesPage } from './imagenes';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';
import { SERVE_FILE_URI } from "../../config";
import { Storage } from "@ionic/storage";

@Component({

  templateUrl: 'detallesusuario.html'

})
export class DetallesusuarioPage {

  nombre;
  apellido;
  email;
  foto;
  datosg;
  constructor(
    public navp: NavParams,
    public authservice: AuthProvider,
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private navparams: NavParams,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    let datos = this.navp.get('datos');
    this.datosg = datos;
    this.nombre = datos.first_name;
    this.apellido = datos.last_name;
    this.email = datos.email;
    this.foto = `${SERVE_FILE_URI}storage/app/${datos.img}`;


  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

  imagenes() {
    this.navCtrl.push(ImagenesPage, { datos: { imagenes: [this.datosg.img], path:`${SERVE_FILE_URI}storage/app/`, nombre: this.nombre } });
  }

  registro(value) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Actualizando contraseña...',
      duration: 5000
    });
    loading.present();
    this.authservice.cambiarpass(value).finally(() => {
      loading.dismiss();
    }).subscribe((data) => {
      const toast = this.toastCtrl.create({
        message: 'Contraseña actualizada',
        duration: 5000,
        position: 'bottom',
        cssClass: 'ToastAlert',
        showCloseButton: true,
        dismissOnPageChange: false
      });
      toast.present();
    }, err => {
      console.log(err);
      if (err.status == 401) {
        const toast = this.toastCtrl.create({
          message: 'La contaseña ingresada no coincide',
          duration: 5000,
          position: 'bottom',
          cssClass: 'ToastAlert',
          showCloseButton: true,
          dismissOnPageChange: false
        });
        toast.present();
      } else {
        const toast = this.toastCtrl.create({
          message: 'confirmacion nueva contraseña no coincide',
          duration: 5000,
          position: 'bottom',
          cssClass: 'ToastAlert',
          showCloseButton: true,
          dismissOnPageChange: false
        });
        toast.present();
      }
    });

  }

  tomarf() {
    let alert = this.alertCtrl.create({
      title: 'Desea adjuntar una imagen a esta pregunta',
      message: 'Para escoger una foto de la galeria del telefono seleccione la opcion Galeria, si desea tomar una foto escoja camara',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            return this.galeria();
          }
        },
        {
          text: 'Camara',
          handler: () => {
            return this.getPicture();

          }
        }
      ]
    });
    alert.present();
  }


  getPicture() {
    let options: CameraOptions = {
      quality: 15,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      targetHeight:500,
      targetWidth:500,
      correctOrientation:true
    }

    this.camera.getPicture(options).then(imageData => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'cargando imagen...',
        duration: 5000
      });
      loading.present();
      let image = "data:image/png;base64," + imageData;

      this.authservice.enviarimagenusuario(imageData).subscribe((nom) => {
        let nimagenn = JSON.parse(nom['response']);
        this.foto= `${SERVE_FILE_URI}storage/app/public/usuario`;
        this.foto = `${SERVE_FILE_URI}storage/app/${nimagenn.suceess}`;
        this.datosg.img = nimagenn.suceess;
        console.log('datosg',this.datosg);
        this.storage.set('mydata', `{"id":${this.datosg.id},"first_name":"${this.datosg.first_name}","email":"${this.datosg.email}","last_name":"${this.datosg.last_name}","img":"${this.datosg.img}"}`)
      })
    }
    ).catch(error => {
      this.toastmsj(JSON.stringify(error));
      console.log('1', error);
    });
  }
  galeria() {
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre = 'pedigreeperfil';

    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.PNG,
      allowEdit:true,
      targetHeight:500,
      targetWidth:500,
      correctOrientation:true
    }
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando imagen...',
      duration: 7000
    });
    loading.present();

    this.camera.getPicture(options)
      .then(imageData => {
        let image = "data:image/png;base64," + imageData;

            this.foto = `${image}`;
            this.authservice.enviarimagenusuario(this.foto).subscribe(nom => {
              let nimagenn = JSON.parse(nom['response']);
              this.foto= `${SERVE_FILE_URI}storage/app/public/usuario`;
              this.foto = `${SERVE_FILE_URI}storage/app/${nimagenn.suceess}`;
              this.datosg.img = nimagenn.suceess;
              console.log('datosg',this.datosg);
              this.storage.set('mydata', `{"id":${this.datosg.id},"first_name":"${this.datosg.first_name}","email":"${this.datosg.email}","last_name":"${this.datosg.last_name}","img":"${this.datosg.img}"}`)
            }, (e) => {
              this.handleError('Error en el servidor, inténtelo de nuevo');
              console.log(e, 'e1¿2');      
            });
          }).catch(error => {
        loading.dismiss();
        this.handleError('No se cargo la imagen, verifique que el formato sea JPG o PNG');
        loading.dismiss();
        console.log(error, 'errorimg');
      });
  }


  handleError(error: string) {
    let message: string;
    message = error;
    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}