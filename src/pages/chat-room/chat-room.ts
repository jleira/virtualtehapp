import { Component,ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController, Content, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from './../../providers/auth/auth';
import { SERVE_FILE_URI } from '../../config';
import { DetallesPage } from '../profile/detalle';
import { AccesoriosPage } from '../accesorios/accesorios';
import { BuscadorPage } from './buscador';
import { PedigremettereditPage } from "../pedigremetter/pedigremetteredit";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagenesPage } from "../profile/imagenes";
/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  @ViewChild('content', { read: Content }) content: Content;
  @ViewChild('myInput') myInput: ElementRef;
  messages = [];
  nickname = '';
  message = '';
  id = 0;
  miid;
  chatid;
  name;
  pruebaf2 = `<div><h5>Texto de prueba</h5></div>`;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private socket: Socket,
    private toastCtrl: ToastController,
    private authservice: AuthProvider,
    private modalCtrl: ModalController,
    public file: File,
    public alertCtrl: AlertController,
    public camera: Camera,
    public loadingCtrl: LoadingController) {
    this.nickname = this.navParams.get('nickname');
    this.id = this.navParams.get('user').id;
    this.name = this.navParams.get('user').first_name;
    this.miid = this.navParams.get('miid');
    this.chatid = this.navParams.get('chat');



    this.authservice.mensajes(this.id).subscribe((mensajes) => {
      let msjs = mensajes.json();
      this.messages = msjs.datos;
      setTimeout(() => {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 10)
      }, 500);
    }, err => {
      this.showToast('No es posible acceder a los mensajes guardados');
    });

    this.getMessages().subscribe(message => {
      let f=new Date();
      let f2=f.getTimezoneOffset();
      f.setMilliseconds(f2*60*1000);
  
      let cad=`${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`
      if (message['usuario_envia'] == this.miid && message['usuario_recibe'] == this.id) {        
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: message['tipo'], creado:cad });
        setTimeout(()=>{
          let dimensions = this.content.getContentDimensions();
    
          this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
    
        },1000)
      } if (message['usuario_envia'] == this.id && message['usuario_recibe'] == this.miid) {
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: message['tipo'], creado:cad });
        setTimeout(()=>{
          let dimensions = this.content.getContentDimensions();
                    this.content.scrollTo(0, dimensions.scrollHeight + 100, 100)
          
                  },1000)

      }
    });


    this.getUsers().subscribe(data => {
      if (data['event'] === 'left') {
        //        this.showToast('User left: ' + user);
      } else {
        //        this.showToast('User joined: ' + user);
      }
    });
  }

  ionViewDidLoad() {
  }


  sendMessage() {
    let data;
    if (this.chatid) {
      data = { usuario_recibe: this.id, mensaje: this.message, id: this.chatid, tipo: 0 };
    } else {
      data = { usuario_recibe: this.id, mensaje: this.message, tipo: 0 };
    }
    this.socket.emit('add-message', { text: this.message, usuario_envia: this.miid, usuario_recibe: this.id, tipo: 0 });
    this.message = '';
    this.authservice.enviarmensaje(data).subscribe((dat) => {
      this.chatid = dat;
    });
  }


  sendimg() {
    let data;
    if (this.chatid) {
      data = { usuario_recibe: this.id, mensaje: this.message, id: this.chatid };
    } else {
      data = { usuario_recibe: this.id, mensaje: this.message };
    }
    this.socket.emit('add-message', { text: this.message, usuario_envia: this.miid, usuario_recibe: this.id, tipo: 0 });
    this.message = '';
    this.authservice.enviarmensaje(data).subscribe((dat) => {
      this.chatid = dat;
    });
  }




  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  pruebaf(mascota) {
    let mascotaiterar = JSON.parse(mascota);
    let img;
    if (mascotaiterar.imagenes) {
      img = `${SERVE_FILE_URI}/storage/app/${mascotaiterar.id_usuario}/${mascotaiterar.id}/${mascotaiterar.imagenes.split(',')[0]}`;
    } else {
      img = 'assets/img/mascota.png';
    }
    return `<img src="${img}" />
  <h4>${mascotaiterar.nombre} ${mascotaiterar.precio}</h4>
  <p>
  ${mascotaiterar.mensaje}
  </p>`;
  }

  pruebap2(producto) {
    let pr = JSON.parse(producto);
    let img;
    if (pr.imagenes) {
      img = `${SERVE_FILE_URI}/storage/app/productos${pr.usuario_id}/${pr.id}/${pr.imagenes.split(',')[0]}`;
    } else {
      img = 'assets/img/inyeccion.png';
    }
    return `<img src="${img}" />
  <h4>${pr.nombre} ${pr.precio}</h4>
  <p>
  ${pr.mensaje}
  </p>`;
  }
  pedigre(mascota) {
    let mat = JSON.parse(mascota);
    return `<img src="http://66.175.220.111${mat.img}" />
  <h4>${mat.nombre}</h4>`;
  }

  vermascota(mascota) {
    let mascotaiterar = JSON.parse(mascota);
    let visit;
    if (this.miid == mascotaiterar.id_usuario) {
      visit = false;
    } else {
      visit = true;
    }
    this.navCtrl.push(DetallesPage, { datos: mascotaiterar, visitante: visit });

  }

  verproducto(productos) {
    let producto = JSON.parse(productos);
    let visit;
    if (this.miid == producto.id_usuario) {
      visit = false;
    } else {
      visit = true;
    }
    this.navCtrl.push(AccesoriosPage, { datos: producto, visitante: visit });
  }
  agregarfuente() {
    let alert = this.alertCtrl.create();
    alert.setTitle('COMPARTIR');

    alert.addInput({
      type: 'radio',
      label: 'Url mascota',
      value: 'url',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Imagen',
      value: 'img',
      checked: false
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.llamar(data);
      }
    });
    alert.present();
  }
  llamar(item) {
    if (item == 'url') {
      let modalp = this.modalCtrl.create(BuscadorPage);
      modalp.present();
      modalp.onDidDismiss((data) => {
        if (data.success) {
          let mas = data.data;
          let dataenviar;
          if (this.chatid) {
            dataenviar = { usuario_recibe: this.id, mensaje: JSON.stringify(mas), id: this.chatid, tipo: 3 };
          } else {
            dataenviar = { usuario_recibe: this.id, mensaje: JSON.stringify(mas), tipo: 3 };
          }
          this.socket.emit('add-message', { text: JSON.stringify(mas), usuario_envia: this.miid, usuario_recibe: this.id, tipo: 3 });
          this.authservice.enviarmensaje(dataenviar).subscribe((dat) => {
            this.chatid = dat;
          });

        }
      });

    }else{
      this.galeria();
    }

  }

  verpedigree(msj) {
    let ped = JSON.parse(msj);
    this.authservice.pedigreemetter(parseInt(ped.id)).subscribe((data) => {
      this.modalCtrl.create(PedigremettereditPage, { data: data, unirp: false }).present();
    });

  }
  galeria() {
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
        let image = "data:image/png;base64," + imageData;

            this.authservice.enviarimagenchat(`${image}`).subscribe((nom) => {
              let nimagenn = JSON.parse(nom['_body']);
              let rimg = nimagenn.suceess;

              let dataenviar;
              if (this.chatid) {
                dataenviar = { usuario_recibe: this.id, mensaje: JSON.stringify({ img: rimg }), id: this.chatid, tipo: 4 };
              } else {
                dataenviar = { usuario_recibe: this.id, mensaje: JSON.stringify({ img: rimg }), tipo: 4 };
              }
              this.socket.emit('add-message', { text: JSON.stringify({ img: rimg }), usuario_envia: this.miid, usuario_recibe: this.id, tipo: 4 });
              this.authservice.enviarmensaje(dataenviar).subscribe((dat) => {
                this.chatid = dat;
              });

            })
          }, (e) => {
          }).catch(error => {
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

  imgruta(msj) {
    let img = SERVE_FILE_URI + 'storage/app/';
    let pr = JSON.parse(msj);
    return `<img src="${img}${pr.img}" />
`;
  }
  verimagen(msj) {
    let pr = JSON.parse(msj);
    let pa=SERVE_FILE_URI + 'storage/app';
    let nom='';
    let imgnes=[pr.img];
    this.navCtrl.push(ImagenesPage, { datos: { imagenes: imgnes, path: pa, nombre: nom } });
  }
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
}

horautc(fecha){
  fecha=fecha.replace(/-/g,'/');
  let fechaneuva=new Date(fecha);

  let f2=fechaneuva.getTimezoneOffset();
  fechaneuva.setMilliseconds(-f2*60*1000);

  return fechaneuva.getHours()+':'+fechaneuva.getMinutes()+':'+fechaneuva.getSeconds();
}

}
