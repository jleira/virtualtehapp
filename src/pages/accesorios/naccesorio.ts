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
     if(values.precio==""){
       values.precio==0;
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
       let cantidadimg=this.imagenes.length;
       if(cantidadimg==0){
        this.viewCtrl.dismiss(true);
       }
       let init=0;
       this.imagenes.forEach(element => {
         init=init+1;
         let accesorio=resp.json()[0];
         this.authService.enviarimagenproducto(element.ruta,accesorio).then(()=>{
           if(init==cantidadimg){
             this.viewCtrl.dismiss(true);
           }
         }).catch((err)=>{
           console.log(err);
           if(init==cantidadimg){
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
       quality: 30,
       destinationType: this.camera.DestinationType.FILE_URI,
       sourceType: this.camera.PictureSourceType.CAMERA,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE
     }
     let targetPath = this.file.externalDataDirectory;
     let nombrecarpetapadre ='cachepets';   
     this.camera.getPicture(options).then(imageData => {
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
         }, (err) => {
           console.log('0',err); 
 
         });
       }).then(() => {
         loading.dismiss();
         this.imagenes.push({ruta:`${targetPath}/${nombrecarpetapadre}/${imageData.replace(this.file.externalCacheDirectory,"")}`});
         console.log(this.imagenes);
       });
     }
     ).catch(error => {
       this.toastmsj(JSON.stringify(error));
      console.log('1',error); 
     });
   }
 
 
   galeria(codigo, respcodigo) {
     let targetPath = this.file.externalDataDirectory;
     let nombrecarpetapadre ='cachepets';
     
 
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
             this.imagenes.push({ruta:`${targetPath}/${nombrecarpetapadre}/${imgname}`});
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
}