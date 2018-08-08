import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from '../chat-room/chat-room';
import { Storage } from "@ionic/storage";
import { FinderPage } from '../finder/finder';
import { ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {SERVE_FILE_URI} from '../../config';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  chats;
  miid = 0;
  misdatos;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private socket: Socket,
    private storage: Storage,
    public authservice: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.storage.get('mydata').then(midata => {
      let misdatos = JSON.parse(midata);
      this.miid = misdatos.id;
      this.misdatos = JSON.parse(midata);
    });

  }
  chat(user) {
    console.log('chat');
    let idchat = user.id;
    if (this.miid == user.usuario1) {
      user.id = user.usuario2;
      user.first_name=user.usuario2name;
      user.last_name=user.usuario2lastname;
    } else {
      user.id = user.usuario1;
      user.first_name=user.usuario1name;
      user.last_name=user.usuario1lastname;

    }
    this.socket.connect();
    this.navCtrl.push(ChatRoomPage, {
      caso: 1,
      miid: this.misdatos.id,
      nickname: this.misdatos.correo,
      correo: this.misdatos.correo,
      user: user,
      chat: idchat
    });
  }

  ionViewWillEnter() {
    this.authservice.traerchat().subscribe((data) => {
      this.chats = data.json().datos;
      console.log(this.chats);
      this.chats.forEach(element => {
        if(element.msj.indexOf('{"id":"')>-1){
          element.msj="Foto";
        }
        console.log(element.msj);
      });
    });

  }
  newchat() {
    this.navCtrl.push(FinderPage, { case: 'chat' });
  }
  formatofecha(fecha) {
    let n = fecha.substr(0, 10);
    let n2 = fecha.substr(11);
    let ffin;
    n = n.split('-');
    ffin = `${n[2]}-${n[1]}-${n[0].substr(2, 2)} ${n2.substr(0, 5)} `;
    return ffin;
  }
  eliminar(item,nombre) {
    setTimeout(() => {
      this.confirmacion(item,nombre);
    }, 500);

  }
  confirmacion(item,nombre) {
    let alert = this.alertCtrl.create({
      title: `Desea eliminar su conoversacion con ${nombre}?`,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.eliminaritem(item);
          }
        },
        {
          text: 'No',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }
  eliminaritem(item) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Eliminando chat...',
      duration: 5000
    });
    loading.present();

    this.authservice.eliminarchat(item.id).finally(()=>{
      loading.dismiss();
    }).subscribe((data)=>{
      this.chats = data.json().datos;
    })
  }

  refrescar($event) {
    this.authservice.traerchat().subscribe((data) => {
      this.chats = data.json().datos;
      $event.complete();
    });
  }

  peopleimg(img){
    let nimag = `${SERVE_FILE_URI}storage/app/${img}`;
    return nimag;
  }
  
}
