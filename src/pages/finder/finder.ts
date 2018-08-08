import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { ProfilePage } from '../profile/profile';
import { DetallesPage } from '../profile/detalle';
import { AccesoriosPage } from '../accesorios/accesorios';
import { Socket } from 'ng-socket-io';
import { Storage } from "@ionic/storage";
import { ChatRoomPage } from '../chat-room/chat-room';
import { SERVE_FILE_URI } from "../../config";

@IonicPage()
@Component({
  selector: 'page-finder',
  templateUrl: 'finder.html',
})
export class FinderPage {
  buscar;
  items = [];
  caso;
  vacio: boolean;
  logeado = false;
  miid;
  clavet = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private authservice: AuthProvider, 
    private socket: Socket, 
    private storage: Storage) {
    this.caso = this.navParams.get('case');
    this.vacio = false;
    this.storage.get('jwt').then((jwt) => {
      if (jwt) {
        this.logeado = true;
      } else {
        this.logeado = false;
      }
      let key = this.caso;
      if (this.caso == 'chat') {
        key = 'people';
      }
      console.log(key);
      if (key == 'todo') {
        this.authservice.buscar(key,
          {
            clave: this.clavet,
            cantidad1: 0,
            cantidad2: 0,
            cantidad3: 0
          }).finally(() => {
          }).subscribe((data) => {
            let datos;
            if (this.logeado) {
              datos = data.json();
            } else {
              datos = data;
            }
            this.items = datos.datos;
            if (this.items.length == 0) {
              this.vacio = true;
            } else {
              this.vacio = false;
            }
            return this.items;
          }, err => {
            return err;
          })
      } else {
        this.authservice.buscar(key, { clave: this.clavet, cantidad: this.items.length }).subscribe((data) => {
          let datos;
          if (this.logeado) {
            datos = data.json();
          } else {
            datos = data;
          }
          this.items = datos.datos;
          if (this.items.length == 0) {
            this.vacio = true;
          } else {
            this.vacio = false;
          }
          return this.items;
        }, err => {
          return err;
        })
      }

    }, err => {
      this.logeado = false;
      this.buscarporclave(' ');
    })

  }


  ionViewDidLoad() {
  }
  onInput($event) {
    this.buscarporclave($event.target.value);
  }

  onCancel($event) {
   }
  buscarporclave(clave) {
    this.clavet = clave;
    if (!clave) {
      this.items = [];
      return "";
    }
    if (clave.length < 3) {
      this.items = [];
      return "";
    }
    let key = this.caso;
    if (this.caso == 'chat') {
      key = 'people';
    }
    return this.authservice.buscar(key, { clave: clave, cantidad: 0 }).subscribe((data) => {
      let datos;
      if (this.logeado) {
        datos = data.json();
      } else {
        datos = data;
      }
      this.items = datos.datos;
      if (this.items.length == 0) {
        this.vacio = true;
      } else {
        this.vacio = false;
      }
      return this.items;
    }, err => {
      return err;
    })
  }
  detallesitem(id) {
    if (this.caso == 'people') {
      this.navCtrl.push(ProfilePage, { caso: 2, userid: id });
    }
    if (this.caso == 'mascotas') {
      this.navCtrl.push(DetallesPage, { datos: id, visitante: true });
    }
    if (this.caso == 'adopcion') {
      this.navCtrl.push(DetallesPage, { datos: id, visitante: true });
    }
  }
  detallesitemtodo(caset, id) {
    if (caset == 'people') {
      this.navCtrl.push(ProfilePage, { caso: 2, userid: id });
    }
    if (caset == 'mascota') {
      this.navCtrl.push(DetallesPage, { datos: id, visitante: true });
    }

  }

  detallesaccesorios(item) {
    this.navCtrl.push(AccesoriosPage, { datos: item, visitante: true });
  }

  formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
      return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

  chat(user) {
    this.storage.get('mydata').then(midata => {
      let misdatos = JSON.parse(midata);
      this.socket.connect();
      this.socket.emit('set-nickname', misdatos.first_name);
      this.navCtrl.setRoot(ChatRoomPage, { caso: 1, miid: misdatos.id, nickname: misdatos.correo, correo: misdatos.correo, user: user });

    });

  }
  buscarimagen(img, idmascota, id_usuario) {
    let nimag = `${SERVE_FILE_URI}storage/app/${id_usuario}/${idmascota}/${img.split(',')[0]}`;
    return nimag;
  }
  buscarimagenp(img, idmascota, id_usuario) {
    let nimag = `${SERVE_FILE_URI}storage/app/productos/${id_usuario}/${idmascota}/${img.split(',')[0]}`;
    return nimag;
  }
  peopleimg(img){
    let nimag = `${SERVE_FILE_URI}storage/app/${img}`;
    return nimag;
  }

  refrescar($event) {
    let key = this.caso;
    if (this.caso == 'chat') {
      key = 'people';
    }
    if (key == 'todo' || key=='quiensigo') {
      this.authservice.buscar(key,
        {
          clave: this.clavet,
          cantidad1: this.items['mascotas'].length,
          cantidad2: this.items['people'].length,
          cantidad3: this.items['productos'].length
        }).finally(() => {
          $event.complete();
        }).subscribe((data) => {
          let datos;
          if (this.logeado) {
            datos = data.json();
          } else {
            datos = data;
          }

          this.items['mascotas'] = datos.datos.mascotas.concat(this.items['mascotas']);
          this.items['people'] = datos.datos.people.concat(this.items['people']);
          this.items['productos'] = datos.datos.productos.concat(this.items['productos']);

          if (this.items.length == 0) {
            this.vacio = true;
          } else {
            this.vacio = false;
          }
          return this.items;
        }, err => {
          return err;
        })
    } else {
      this.authservice.buscar(key, { clave: this.clavet, cantidad: this.items.length }).finally(() => {
        $event.complete();
      }).subscribe((data) => {
        let datos;
        if (this.logeado) {
          datos = data.json();
        } else {
          datos = data;
        }
        this.items = this.items.concat(datos.datos);
        if (this.items.length == 0) {
          this.vacio = true;
        } else {
          this.vacio = false;
        }
        return this.items;
      }, err => {
        return err;
      })
    }

  }
}
