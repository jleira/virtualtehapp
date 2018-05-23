import { Component } from '@angular/core';
import { ViewController, NavParams,NavController , LoadingController} from 'ionic-angular';
import { ImagenesPage } from './imagenes';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({

  templateUrl: 'detallesusuario.html'

})
export class DetallesusuarioPage {

  nombre;
  apellido;
  email;
  foto;
  

  constructor(
    public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController,
    private camera: Camera,
    private loadingCtrl: LoadingController
 
  ) {
    let datos=this.navp.get('datos');
    this.nombre=datos.first_name;
    this.apellido=datos.last_name;
    this.email=datos.email;
    this.foto='';
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

imagenes(){
  this.navCtrl.push(ImagenesPage);
}
getPicture() {
  let options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then(imageData => {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Actualizando mapa...'
    });
    loading.present();

    this.foto = imageData;

    loading.dismiss();

  }).catch(error => {
    console.log('err');
  });

}

}