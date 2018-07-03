import { Component } from '@angular/core';
import { NavController, ViewController,NavParams, AlertController,LoadingController, ToastController } from 'ionic-angular';
import {SERVE_FILE_URI} from '../../config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, DirectoryEntry } from '@ionic-native/file';


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
    private viewCtrl:ViewController, 
    private navparams:NavParams,
    public file: File,
    public alertCtrl:AlertController,
    public camera :Camera,
    public loadingCtrl: LoadingController,
  public toastCtrl:ToastController) {
//    this.nombres= this.navparams.get('nombres');
    let item=this.navparams.get('item');
    this.estado=this.navparams.get('caso');

    console.log(item);

    this.nombre=item.nombre;
    this.imagen=item.imagen;
    this.path=item.imagen;
    this.mascota={nombre:this.nombre};
    this.mismascotas=this.navparams.get('mismascotas');
    this.caso=item.caso;
    

} 
 
  cancelar(){
      this.viewCtrl.dismiss({successs:false});
  }

  guardar(){
    let item={nombre:this.nombre,imagen:this.path,caso:this.caso};
     this.viewCtrl.dismiss({itemedited:item,successs:true});
  }

  cambiarmascosta() {
  this.nombre=this.mascota.nombre;
  if (this.mascota.imagenes) {
    let imgname = this.mascota.imagenes.split(',')[0];
    this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`;
    this.caso=2;
  }else{
    this.path='assets/img/mascota.png';
    this.caso=1;
  }
  }


  presentConfirm(codigo, respcodigo) {

    let targetPath = this.file.externalDataDirectory;
    let idgrupo = codigo;

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
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre ='pedigreepets';
    
   
    let nombreimg;

    this.camera.getPicture(options).then(imageData => {
      let nombreimg = imageData.replace(this.file.externalCacheDirectory, "");
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'cargando imagen...',
        duration: 5000
      });
      loading.present();

      return this.file.createDir(targetPath, nombrecarpetapadre, true).then(() => {}, () => {}).then(() => {
      }).then(() => {
        return this.file.copyFile(
          this.file.externalCacheDirectory, imageData.replace(this.file.externalCacheDirectory, ""),
          targetPath + `/${nombrecarpetapadre}`,
          imageData.replace(this.file.externalCacheDirectory, ""));
      }).then((ok
      ) => {
        this.file.removeFile(this.file.externalCacheDirectory, imageData.replace(this.file.externalCacheDirectory, ""
        )).then((ok) => {
          this.path=`${targetPath}/${nombrecarpetapadre}/${imageData.replace(this.file.externalCacheDirectory,"")}`;
          this.caso=3;

        }, (err) => {
          console.log('0',err); 

        });
      }).then(() => {
        loading.dismiss();
      });
    }
    ).catch(error => {
      this.toastmsj(JSON.stringify(error));
     console.log('1',error); 
    });
  }


  galeria(codigo, respcodigo) {
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre ='pedigreepets';
    
   
    let nombreimg;

    let preguntaid = codigo;

    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
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
        let image = "data:image/jpg;base64," + imageData;
        let block = image.split(";");
        let contentType = block[0].split(":")[1];
        let realData = block[1].split(",")[1];
        let blob = this.b64toBlob(realData, contentType, 512);
        let imgname = Date.now().toString() + '.png';

        return this.file.createDir(targetPath, nombrecarpetapadre, true).then(() => { }, (e) => { }).then(() => {
          return this.file.writeFile(targetPath + `${nombrecarpetapadre}/`, imgname, blob).then((ok) => {
            this.path=`${targetPath}/${nombrecarpetapadre}/${imgname}`;
            this.caso=3;

//            this.imagenes.push({ruta:`${targetPath}/${nombrecarpetapadre}/${imgname}`});
           }, (e) => { 
             console.log(e,'e1');});
        }).then(() => {
          loading.dismiss();
        }).catch((e) => {
          loading.dismiss();
          this.handleError('Error en el dispositivo, inténtelo de nuevo');
          console.log(e,'e1¿2');
        }
        );
      }).catch(error => {
        this.handleError('No se cargo la imagen, verifique que el formato sea JPG o PNG');
        loading.dismiss();
        console.log(error,'errorimg');      });
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
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