import { Component } from '@angular/core';
import { ViewController, NavParams,NavController , LoadingController, ToastController} from 'ionic-angular';
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
    private loadingCtrl: LoadingController,
    public toastCtrl:ToastController
 
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
      content: 'Actualizando foto...',
    });
    loading.present();

    this.foto = imageData;

    loading.dismiss();

  }).catch(error => {
    console.log('err');
  });
}

registro()
{ 
   let loading = this.loadingCtrl.create({
  spinner: 'bubbles',
  content: 'Actualizando contraseña...',
  duration: 5000
});
loading.present().then(()=>{
  setTimeout(()=>{
    const toast = this.toastCtrl.create({
      message: 'Error en el servidor, intentelo nuevamente',
      duration: 3000,
      position: 'bottom',
      cssClass:'ToastAlert',
      showCloseButton:true,
      dismissOnPageChange:false
  
    });
    toast.present();  
  },5300);

});
}

}