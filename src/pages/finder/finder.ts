import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AuthProvider} from './../../providers/auth/auth';
import {ProfilePage} from '../profile/profile';
import { DetallesPage } from '../profile/detalle';
import { Socket } from 'ng-socket-io';
import { Storage } from "@ionic/storage";
import { ChatRoomPage} from '../chat-room/chat-room';


/**
 * Generated class for the FinderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finder',
  templateUrl: 'finder.html',
})
export class FinderPage {
  buscar;
  items;
  caso;
  vacio:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice:AuthProvider, private socket: Socket, private storage:Storage) {
    this.caso=this.navParams.get('chat');

    this.vacio=false;
  }

  ionViewDidLoad() {
  }
  onInput($event){
    this.buscarporclave($event.target.value);        
  }

  onCancel($event){
    this.buscarporclave($event.target.value);        
  }
  buscarporclave(clave){
    let key =this.caso;
    if(this.caso='chat'){
      key='people';
    }
    this.authservice.buscar(key,{clave:clave}).subscribe((data)=>{
      let datos=data.json();
      this.items=datos.datos;
      if(this.items.length==0){
        this.vacio=true;
      }else{
        this.vacio=false;        
      }
    },err=>{
    })
  }
  detallesitem(id){
    if(this.caso=='people'){
      this.navCtrl.push(ProfilePage,{caso:2,userid:id});
    }
    if(this.caso=='mascotas'){
      this.navCtrl.push(DetallesPage,{datos:id,visitante:true});
    }
  }

 formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

chat(user){
  this.storage.get('mydata').then(midata => {
    console.log(midata);
    let misdatos=JSON.parse(midata);
    this.socket.connect();
    this.socket.emit('set-nickname', misdatos.first_name);
    this.navCtrl.setRoot(ChatRoomPage, { caso:1, miid: misdatos.id ,nickname: misdatos.correo, correo:misdatos.correo, user:user });

  });

}

}
