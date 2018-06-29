import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ImagenesPage } from '../../pages/profile/imagenes';
import { SERVE_FILE_URI } from "../../config";
import { Storage } from "@ionic/storage";
import { AuthProvider } from '../../providers/auth/auth';
import {ChatRoomPage} from '../chat-room/chat-room';

/**
 * Generated class for the AccesoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accesorios',
  templateUrl: 'accesorios.html',
})
export class AccesoriosPage {
    id;
    nombre;
    descripcion;
    visitante:boolean;
    precio:number;
    imagenesp=[];
    miid;
    categoria;
    path;
    datosproducto;
  constructor( public viewCtrl: ViewController,
    public navp: NavParams,
    public navCtrl: NavController,
    private storage:Storage,
    public alertCtrl: AlertController,
    public toastc: ToastController,
    private authservice: AuthProvider,
    private loadingCtrl: LoadingController
) {
      this.visitante=true;
    let datos = navp.get('datos');
    this.datosproducto=datos;
    
    this.visitante=navp.get('visitante');
    this.nombre=datos.nombre;
    this.descripcion=datos.descripcion;
    this.precio=datos.precio;
    this.categoria=datos.categoria;
    this.miid=datos.usuario_id;
    this.id=datos.id;//datos de la mascota
    this.path=`${SERVE_FILE_URI}storage/app/productos/${this.miid}/${this.id}`;
    this.imagenesp=datos.imagenes;
    if(this.imagenesp){
      this.imagenesp=datos.imagenes.split(',');
      
    }
    console.log('datos',datos);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccesoriosPage');
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

imagenes(imagenes){
  this.navCtrl.push(ImagenesPage,{datos:{imagenes:imagenes,path:this.path,nombre:this.nombre}});
}
buscarimagen(img){
  let nimag=`${this.path}/${img[0]}`;
  return nimag;
}


abrirchat() {
  let alert = this.alertCtrl.create({
    title: `Mensaje para ${this.datosproducto.first_name} ${this.datosproducto.last_name}`,
    message: 'Este mensaje se enviara automaticamente ysera dirigido al chat',
    inputs: [
      {
        name: 'mensaje',
        placeholder: 'name'
      },
    ],
    buttons: [
      {
        text: 'Save',
        handler: (data) => {
          if (!data.mensaje) {
            return this.toastmsj('el mensaje no puede estar vacio');
          } else {
            this.enviarmensaje(data.mensaje);
          }

        }

      },
      {
        text: 'Cancel',
        handler: () => {
        }
      }
    ]
  });
  alert.present();
}
toastmsj(mensaje = 'mensaje desconocido') {
  const toast = this.toastc.create({
    message: mensaje,
    duration: 5000,
    position: 'bottom'
  });
  toast.present();
}

enviarmensaje(msj) {
  this.datosproducto.mensaje = msj;
  this.datosproducto.tipo = 2;
  this.datosproducto.id_usuario=this.datosproducto.usuario_id;
  this.datosproducto.mascota=JSON.stringify(this.datosproducto);
  this.authservice.enviarmensajemascota(this.datosproducto).subscribe(()=>{
    let usr={
      id:this.datosproducto.id_usuario
    };
    this.chat(usr);
  },err=>{
    this.toastmsj('Hubo un error, intentelo mas tarde');
  });
}
chat(user){
  this.storage.get('mydata').then(midata => {
    console.log('midata');
    let misdatos=JSON.parse(midata);
    this.navCtrl.setRoot(ChatRoomPage, { caso:1, miid: misdatos.id ,nickname: misdatos.correo, correo:misdatos.correo, user:user });  
  });

}


}
