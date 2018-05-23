import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage} from '../chat-room/chat-room';
import { Storage } from "@ionic/storage";
import {FinderPage} from '../finder/finder';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public navCtrl: NavController, private socket: Socket, private storage:Storage) {

  }

  chat(user){
    this.storage.get('mydata').then(midata => {
      let misdatos=JSON.parse(midata);
      this.socket.connect();
      this.socket.emit('set-nickname', misdatos.first_name);
      this.navCtrl.push(ChatRoomPage, { caso:1, nickname: misdatos.correo, correo:misdatos.correo, user:user });
  
    });

  }
  newchat(){
    this.navCtrl.push(FinderPage,{case:'chat'});
  }


}
