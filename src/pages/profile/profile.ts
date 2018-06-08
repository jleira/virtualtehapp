import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { NmascotaPage } from '../profile/nmascota';
import { DetallesPage } from '../profile/detalle';
import { DetallesusuarioPage } from '../profile/detalleusuario';
import { Storage } from "@ionic/storage";
import { SERVE_FILE_URI } from "../../config";
import { NaccesorioPage } from '../accesorios/naccesorio';
import { AccesoriosPage } from '../accesorios/accesorios';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  mismascotas;
  accesorios;
  name;
  misdatos;
  seguir: boolean;
  visitante:boolean;
  datospersonales: {
    seguidores: number,
    nombre: string,
    seguidos: number,
    ejemplares: number
  };
  pet: string = "misejemplares";
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
  public viewCtrl:ViewController, private toastmsj:ToastController, private storage:Storage) {
    this.visitante=true;
    this.datospersonales = {
      seguidores: 0,
      nombre: '',
      seguidos: 0,
      ejemplares: 0
    };
    this.storage.get('mydata').then((misdatos)=>{
      this.misdatos=JSON.parse(misdatos);
    });  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  ionViewDidEnter() {
    this.visitante=true;
    if (this.navParams.get('caso')) {
      if (this.navParams.get('caso') == 2) {
        console.log('visitante');
        this.visitante=true;
        this.detallesdedatos(this.navParams.get('userid'));
        this.traermascotas(this.navParams.get('userid'));
        this.traeraccesorio(this.navParams.get('userid'));
      }
      if (this.navParams.get('caso') == 1) {
        console.log('mi perfil');
        this.detallesdedatos(0);
        this.visitante=false;
        this.traermascotas(0);
        this.traeraccesorio(0);
      }
    }else{
      this.detallesdedatos(0);
      this.visitante=false;
      this.traermascotas(0);
      this.traeraccesorio(0);
    }


   }
  crearmascota() {
    let profileModal = this.modalCtrl.create(NmascotaPage, { userId: 8675309 });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if (data) {
        this.traermascotas(0);
      }
    });

  }
  crearaccesorio(){
    let profileModal = this.modalCtrl.create(NaccesorioPage, { userId: 8675309 });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if (data) {
        this.traeraccesorio(0);
      }
    });
    
  }
  traermascotas(id) {
    this.authservice.mismascostas(id).subscribe((data) => {
      this.mismascotas = data.json();
      console.log(data.json());
    }, err => {
      console.log(err);
    })
  }
  traeraccesorio(id) {
    this.authservice.misaccesorios(id).subscribe((data) => {
      this.accesorios = data.json();
      console.log(data.json());
    }, err => {
      console.log(err);
    })
  }

  detallesmascota(datos) {
    console.log(datos);
    datos.idusuario=this.misdatos.id;
    this.navCtrl.push(DetallesPage, { datos: datos,visitante:this.visitante });

  }
  detallesaccesorio(accesorio){
    console.log(accesorio);
    this.navCtrl.push(AccesoriosPage, { datos: accesorio,visitante:this.visitante });

  }

  detallesdedatos(id) {
    this.authservice.findbyid(id).subscribe((datosusuario) => {
      console.log(datosusuario.json());
      let data = datosusuario.json();
      this.datospersonales.seguidores = data.seguidores;
      this.datospersonales.nombre = data.nombre;
      this.datospersonales.seguidos = data.seguidos;
      this.datospersonales.ejemplares = data.ejemplares;
      if (data.losigo > 0) {
        this.seguir = false;
      } else {
        this.seguir = true;
      }

      console.log(this.datospersonales);
      this.name = this.datospersonales.nombre;
    }, err => {
      console.log(err);
    })
  }

  cancelar() {
    this.viewCtrl.dismiss();
}

seguirusuario(va){
  if(va==true){//vamos a seguir
    this.authservice.seguirusuario(1,this.navParams.get('userid')).finally(()=>{
      this.detallesdedatos(this.navParams.get('userid'));
    }).subscribe((ok)=>{
      console.log(ok);
      this.seguir=!va;
      },err=>{
        this.toasmsjs(err['_body']);
    
    });
  }else{//dejar de seguir
    this.authservice.seguirusuario(2,this.navParams.get('userid')).finally(()=>{
      this.detallesdedatos(this.navParams.get('userid'));
    }).subscribe((ok)=>{
      this.seguir=!va;        
    },err=>{
      this.toasmsjs(err['_body']);
    });
  }

}

toasmsjs(msj){
  const toast = this.toastmsj.create({
    message: msj,
    duration: 5000,
    position: 'top',
    cssClass:'ToastAlert',
    showCloseButton:true,
    dismissOnPageChange:true

  });
  toast.present(); 
}

configuraciones(){
  console.log('configuracion');
  this.storage.get('mydata').then(data => {
    this.modalCtrl.create(DetallesusuarioPage,{datos:JSON.parse(data)}).present();
  });
}
buscarimagen(img,idmascota){
    let nimag=`${SERVE_FILE_URI}storage/app/${this.misdatos.id}/${idmascota}/${img.split(',')[0]}`;
    return nimag;
}
buscarimagenp(img,idmascota,userid){
  let nimag=`${SERVE_FILE_URI}storage/app/productos/${userid}/${idmascota}/${img.split(',')[0]}`;
  return nimag;
}
}
