import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-nmascota',
  templateUrl: 'nmascota.html'

})
export class NmascotaPage {
  private todo : FormGroup;

  imagenes = [];
  datos;
  id=0;
  constructor(
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public authService: AuthProvider,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    private navParams: NavParams,
    private formBuilder: FormBuilder

  ) {
    console.log('entro a perfiles');
    this.datos = this.navParams.get('datos');
    console.log(this.datos);
    if(this.datos){
      console.log('editar');
      this.todo = this.formBuilder.group({
        nombre:[this.datos.nombre,Validators.required],      
        raza:[this.datos.raza,Validators.required],
        sexo:[this.datos.sexo,Validators.required],
        color:[this.datos.color,Validators.required],
        microchip:[this.datos.microchip,Validators.required],
        vender:[this.datos.vender,Validators.required],
        precio:[this.datos.precio,Validators.required],      
        id:[this.datos.id]      
      });
    }else{
      console.log('crear');
      this.todo = this.formBuilder.group({
        nombre:['',Validators.required],      
        raza:['',Validators.required],
        sexo:[2,Validators.required],
        color:['',Validators.required],
        microchip:['',Validators.required],
        vender:[0,Validators.required],
        precio:['',Validators.required],      
        id:[0]      
      });
    }
   
  }

  cancelar() {
    this.viewCtrl.dismiss(false);
  }

  registrar(values: any) {
    console.log(values);
    if (!values.precio) {
      values.precio == 0;
    }
    console.log('2', values);


    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando datos...'

    });
    loading.present();
    this.authService.registrarmascota(values).finally(() => {
      loading.dismiss();
    }).subscribe((resp) => {
      this.toastmsj(`mascota ${resp.json()[0]['nombre']} creada exitosamente`);
      let cantidadimg = this.imagenes.length;
      if (cantidadimg == 0) {
        this.viewCtrl.dismiss(true);
      }
      let init = 0;
      console.log('img',this.imagenes);
      this.imagenes.forEach(element => {
        init = init + 1;
        console.log('img',init,element);

        let mascosta = resp.json()[0];
        console.log('mascota', mascosta);
        this.authService.enviarimagen(element.ruta, mascosta).subscribe(() => {
          if (init == cantidadimg) { 
            this.viewCtrl.dismiss(true);
          }
        }, err => {
          console.log(err);
          if (init == cantidadimg) {
            this.viewCtrl.dismiss(true);
          }
        });
      });

    }, (error) => {
      console.log(error);
      this.toastmsj(error['_body']);
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

  presentConfirm(codigo=1, respcodigo=1) {
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
      this.imagenes.push({ ruta:`${image}` });
      loading.dismiss();


    }).catch(error => {
      this.toastmsj(JSON.stringify(error));
      console.log('1', error);
    });
  }


  galeria() {
    let targetPath = this.file.cacheDirectory;
    let nombrecarpetapadre = 'cachepets';
    console.log('ruta de las imagenes ', targetPath);
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
        console.log('camerca ok');
        let image = "data:image/png;base64," + imageData;
        this.imagenes.push({ ruta: `${image}` });
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

  prueba(){
    console.log(this.todo.value)

  }
}