import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AuthProvider} from './../../providers/auth/auth';
import {ProfilePage} from '../profile/profile';
import { DetallesPage } from '../profile/detalle';
import { AccesoriosPage } from '../accesorios/accesorios';
import { Socket } from 'ng-socket-io';
import { Storage } from "@ionic/storage";
import { ChatRoomPage} from '../chat-room/chat-room';
import { SERVE_FILE_URI } from "../../config";

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
  logeado=false;
  miid;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice:AuthProvider, private socket: Socket, private storage:Storage) {
    this.caso=this.navParams.get('case');
    this.vacio=false;
    this.storage.get('jwt').then((jwt)=>{
      console.log(jwt);
      if(jwt){
        this.logeado=true;
        this.buscarporclave(' ');
      }else{
        this.logeado=false;
        this.buscarporclave(' ');
          
      }
    },err=>{
      console.log(err);

      this.logeado=false;
      this.buscarporclave(' ');

    })

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
    //console.log(key);
    if(this.caso=='chat'){
      key='people';
    }
     //console.log(key);
    this.authservice.buscar(key,{clave:clave}).subscribe((data)=>{
      let datos;
      if(this.logeado){
        console.log(data);
        datos=data.json();
      }else{
        datos=data;
      }
        this.items=datos.datos;
        //console.log(this.items,'items');
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

  detallesaccesorios(item){
    this.navCtrl.push(AccesoriosPage,{datos:item,visitante:true});

  }

 formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

chat(user){
  this.storage.get('mydata').then(midata => {
    //console.log(midata);
    let misdatos=JSON.parse(midata);
    this.socket.connect();
    this.socket.emit('set-nickname', misdatos.first_name);
    this.navCtrl.setRoot(ChatRoomPage, { caso:1, miid: misdatos.id ,nickname: misdatos.correo, correo:misdatos.correo, user:user });

  });

}
buscarimagen(img,idmascota,id_usuario){
  let nimag=`${SERVE_FILE_URI}storage/app/${id_usuario}/${idmascota}/${img.split(',')[0]}`;
  return nimag;
}
buscarimagenp(img,idmascota,id_usuario){
  let nimag=`${SERVE_FILE_URI}storage/app/productos/${id_usuario}/${idmascota}/${img.split(',')[0]}`;
  return nimag;
}

}
