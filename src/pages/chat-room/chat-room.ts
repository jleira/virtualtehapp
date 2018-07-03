import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from './../../providers/auth/auth';
import { SERVE_FILE_URI } from '../../config';
import { DetallesPage } from '../profile/detalle';
import { AccesoriosPage } from '../accesorios/accesorios';

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
  @ViewChild('content', { read:Content }) content:Content ;

  messages = [];
  nickname = '';
  message = '';
  id = 0;
  miid;
  chatid;
  pruebaf2 = `<div><h5>Texto de prueba</h5></div>`;
  constructor(private navCtrl: NavController, private navParams: NavParams,
    private socket: Socket, private toastCtrl: ToastController, private authservice: AuthProvider) {
    this.nickname = this.navParams.get('nickname');
    this.id = this.navParams.get('user').id;
    this.miid = this.navParams.get('miid');
    this.chatid = this.navParams.get('chat');

    console.log('chatid', this.chatid);

    this.authservice.mensajes(this.id).subscribe((mensajes) => {
      let msjs = mensajes.json();
      console.log(msjs);
      this.messages = msjs.datos;
      setTimeout(() => {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight+100, 10)
      }, 100);
    }, err => {
      this.showToast('No es posible acceder a los mensajes guardados');
    });

    this.getMessages().subscribe(message => {
      if(message['usuario_envia']==this.miid && message['usuario_recibe']==this.id){
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: 0 });
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight+100, 100)  
      }if(message['usuario_envia']==this.id && message['usuario_recibe']==this.miid){
        this.messages.push({ usuario_envia: message['usuario_envia'], usuario_recibe: message['usuario_recibe'], mensaje: message['text'], tipo: 0 });
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight+100, 100)  
      }
    });


    this.getUsers().subscribe(data => {
      let user = data['user'];
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
      data = { usuario_recibe: this.id, mensaje: this.message, id: this.chatid };
    } else {
      data = { usuario_recibe: this.id, mensaje: this.message };
    }
    this.socket.emit('add-message', { text: this.message, usuario_envia: this.miid, usuario_recibe: this.id });
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
    this.navCtrl.push(AccesoriosPage,{datos:producto,visitante:visit});

  }

}
