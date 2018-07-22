import { Component, ViewChild } from '@angular/core';
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
    console.log(this.navParams.get('user'));
    this.name = this.navParams.get('user').first_name;
    this.miid = this.navParams.get('miid');
    this.chatid = this.navParams.get('chat');

    console.log('chatid', this.chatid);

    this.authservice.mensajes(this.id).subscribe((mensajes) => {
      let msjs = mensajes.json();
      console.log(msjs);
      this.messages = msjs.datos;
      setTimeout(() => {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 10)
      }, 100);
    }, err => {
      this.showToast('No es posible acceder a los mensajes guardados');
    });

    this.getMessages().subscribe(message => {
      console.log(message);
      if (message['usuario_envia'] == this.miid && message['usuario_recibe'] == this.id) {
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: message['tipo'] });
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 100)
      } if (message['usuario_envia'] == this.id && message['usuario_recibe'] == this.miid) {
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: message['tipo'] });
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 100)
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
    console.log('ionViewDidLoad ChatRoomPage');
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
    let targetPath = this.file.externalDataDirectory;
    let nombrecarpetapadre = 'cachepets';
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
            this.authservice.enviarimagenchat(`${targetPath}/${nombrecarpetapadre}/${imgname}`).then((nom) => {
              let nimagenn = JSON.parse(nom['response']);
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
            console.log(e, 'e1');
          });
        }).then(() => {
          loading.dismiss();
        }).catch((e) => {
          loading.dismiss();
          this.handleError('Error en el dispositivo, inténtelo de nuevo');
          console.log(e, 'e1¿2');
        }
        );
      }).catch(error => {
        this.handleError('No se cargo la imagen, verifique que el formato sea JPG o PNG');
        loading.dismiss();
        console.log(error, 'errorimg');
      });
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
}
