import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { PedigremettereditPage } from './pedigremetteredit';
import { NavController, ViewController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SERVE_FILE_URI } from '../../config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, DirectoryEntry } from '@ionic-native/file';


/**
 * Generated class for the PedigremetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detallesimg',
  templateUrl: 'detallesimg.html',
})
export class DetallesimgPage {
  items;
  myInput;
  detalle;
  nombre;
  imagen;
  datos;

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authservice: AuthProvider) {
    this.detalle = this.navParams.get('item');
    console.log(this.detalle);
    this.nombre = this.detalle.nombre;
    this.imagen = this.detalle.imagen;
  }

  ionViewDidLoad() {

  }
  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
    this.buscarporclave($event.target.value);
  }
  buscarporclave(clave) {
    if (!clave) {
      return "";
    }
    if (clave.length < 2) {
      return "";
    }
    this.authservice.mascotasmetter(clave).subscribe((data) => {

      this.items = data;
      console.log(data);
    });
  }


  verpedigree(item) {
    console.log('item', item);
    this.authservice.pedigreemetter(parseInt(item.id)).subscribe((data) => {
      this.navCtrl.push(PedigremettereditPage, { data: data })
      console.log(data);
    });
  }
  cambiardatos(item) {
    this.nombre = item.nombre;
    this.imagen = `http://66.175.220.111${item.img}`;
  }

  cambiarimagen() {

    let targetPath = this.file.externalDataDirectory;

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
      quality: 70,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }


    let nombreimg;

    this.camera.getPicture(options)
      .then(imageData => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'cargando imagen...',
          duration: 5000
        });
        this.imagen = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
        this.toastmsj(JSON.stringify(error));
      });

  }


  galeria() {

    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG
    }
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando imagen...',
      duration: 7000
    });
    loading.present();

    this.camera.getPicture(options)
      .then(imageData => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'cargando imagen...',
          duration: 5000
        });
        this.imagen = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
        this.toastmsj(JSON.stringify(error));
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

  guardar(){
    this.detalle.nombre=this.nombre;
    this.detalle.imagen=this.imagen;
    let item=this.detalle;
     this.viewCtrl.dismiss({itemedited:item,successs:true});
  }
  close(){
    this.viewCtrl.dismiss({successs:false});
  }

}