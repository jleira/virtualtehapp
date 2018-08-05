import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-naccesorios',
  templateUrl: 'naccesorio.html'

})
export class NaccesorioPage {

  imagenes = [];
  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public authService: AuthProvider,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera
  ) {

  }

  cancelar() {
    this.viewCtrl.dismiss(false);
  }

  registrar(values: any) {
    console.log(values);
    if (values.precio == "") {
      values.precio == 0;
    }


    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando datos...'

    });
    loading.present();
    this.authService.registraraccesorio(values).finally(() => {
      loading.dismiss();
    }).subscribe((resp) => {
      this.toastmsj(`accesorio ${resp.json()[0]['nombre']} creado exitosamente`);
      //
      let cantidadimg = this.imagenes.length;
      if (cantidadimg == 0) {
        this.viewCtrl.dismiss(true);
      }
      let init = 0;
      this.imagenes.forEach(element => {
        init = init + 1;
        let accesorio = resp.json()[0];
        this.authService.enviarimagenproducto(element.ruta, accesorio).subscribe(dat => {
          if (init == cantidadimg) {
            this.viewCtrl.dismiss(true);
          }
        },(err) => {
          console.log(err);
          if (init == cantidadimg) {
            this.viewCtrl.dismiss(true);
          }
        });
      });

    }, error => {
      let err = error.json();
      for (let i in err) {
        if (err.hasOwnProperty(i)) {
          this.toastmsj(err[i]);
        }
      }
    });

  }
  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
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
      allowEdit: true,
      targetHeight: 500,
      targetWidth: 500,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(imageData => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'cargando imagen...',
        duration: 5000
      });
      loading.present();
      let image = "data:image/png;base64," + imageData;
      this.imagenes.push({ ruta: `${image}` });
      console.log(this.imagenes);
      loading.dismiss();
    }).catch(error => {
      this.toastmsj(JSON.stringify(error));
      console.log('1', error);
    });
  }


  galeria(codigo, respcodigo) {
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre = 'cachepets';


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
    this.camera.getPicture(options)
      .then(imageData => {
        console.log('camerca ok');
        let image = "data:image/png;base64," + imageData;
        this.imagenes.push({ ruta: `${image}` });
        loading.dismiss();

      }, (e) => {
        this.handleError('No se cargo la imagen, verifique que el formato sea JPG o PNG');
        loading.dismiss();
        console.log(e, 'errorimg');
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
}