import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SERVE_FILE_URI } from '../../config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-succesion',
  templateUrl: 'succesion.html'
})
export class SuccesionPage {
  contador;
  linasucesion;
  sucesores;
  nombres;
  nombre;
  imagen;
  mismascotas;
  imagentemporal;
  mascota;
  $;
  path;
  caso;
  estado;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private navparams: NavParams,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    //    this.nombres= this.navparams.get('nombres');
    let item = this.navparams.get('item');
    this.estado = this.navparams.get('caso');

    console.log(item);

    this.nombre = item.nombre;
    this.imagen = item.imagen;
    this.path = item.imagen;
    this.mascota = { nombre: this.nombre };
    this.mismascotas = this.navparams.get('mismascotas');
    this.caso = item.caso;


  }

  cancelar() {
    this.viewCtrl.dismiss({ successs: false });
  }

  guardar() {
    let item = { nombre: this.nombre, imagen: this.path, caso: this.caso };
    this.viewCtrl.dismiss({ itemedited: item, successs: true });
  }

  cambiarmascosta() {
    this.nombre = this.mascota.nombre;
    if (this.mascota.imagenes) {
      let imgname = this.mascota.imagenes.split(',')[0];
      this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`;
      this.caso = 2;
    } else {
      this.path = 'assets/img/mascota.png';
      this.caso = 1;
    }
  }


  presentConfirm(codigo, respcodigo) {
    let alert = this.alertCtrl.create({
      title: 'Desea adjuntar una imagen a esta pregunta',
      message: 'Para escoger una foto de la galeria del telefono seleccione la opcion Galeria, si desea tomar una foto escoja camara',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            return this.galeria(codigo, respcodigo);
          }
        },
        {
          text: 'Camara',
          handler: () => {
            return this.getPicture(codigo, respcodigo);

          }
        }
      ]
    });
    alert.present();
  }


  getPicture(codigo, respcodigo) {
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
      this.path = `${image}`;
      loading.dismiss();
      }).catch(error => {
      this.toastmsj(JSON.stringify(error));
      console.log('1', error);
    });
  }


  galeria(codigo, respcodigo) {

    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.PNG,
      allowEdit: true,
      targetHeight: 500,
      targetWidth: 500,
      correctOrientation: true
    }
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando imagen...',
      duration: 7000
    });
    loading.present();

    this.camera.getPicture(options).then(imageData => {
      let image = "data:image/png;base64," + imageData;
      this.path = `${image}`;
      this.caso = 3;
      loading.dismiss();
 
    }, (e) => {
      console.log(e, 'e1');
      this.handleError('No se cargo la imagen, verifique que el formato sea JPG o PNG');
      loading.dismiss();
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