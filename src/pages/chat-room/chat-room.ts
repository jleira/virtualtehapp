import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import{AuthProvider} from './../../providers/auth/auth';
 

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
  messages = [];
  nickname = '';
  message = '';
  id=0;
  miid;

  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private socket: Socket, private toastCtrl: ToastController, private authservice:AuthProvider){
    this.nickname = this.navParams.get('nickname');
    this.id=this.navParams.get('user').id;
    this.miid=this.navParams.get('miid');
  console.log('id',this.id,'miid',this.miid);
    this.authservice.mensajes(this.id).subscribe((mensajes)=>{
      let msjs=mensajes.json();
      console.log(msjs);
      this.messages=msjs.datos;
    },err=>{
      this.showToast('No es posible acceder a los mensajes guardados');
    });
    this.getMessages().subscribe(message => {
      console.log(message);
      if(message['usuario_envia']==this.miid){
        this.messages.push({usuario_envia:this.miid,usuario_recibe:this.id,mensaje:message['text']});
      }else{
        this.messages.push({usuario_envia:this.id,usuario_recibe:this.miid,mensaje:message['text']});        
      }
    });  


     this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }
  

  sendMessage() {
    let data={usuario_recibe:this.id,mensaje:this.message};
    this.authservice.enviarmensaje(data).subscribe((dat)=>{
      this.socket.emit('add-message', { text: this.message, usuario_envia:this.miid });
      this.message = '';
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




}
