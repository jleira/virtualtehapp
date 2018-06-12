import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SERVE_FILE_URI } from '../../config';
import { SuccesionPage } from './succesion';
@Component({
  selector: 'page-new-pedigree',
  templateUrl: 'new-pedigree.html'
})
export class NewPedigreePage {
  mismascotas;
  mascota;
  path;
  contador = 0;
  succesiones;
  siguientes = [];
  caso;
  constructor(public navCtrl: NavController, public navparams: NavParams, public viewCtrl: ViewController, private authservice: AuthProvider,
    private modal: ModalController, private alertCtrl: AlertController, private toastc: ToastController, private loadingCtrl: LoadingController) {
    console.log();
    let caso=this.navparams.get('caso');
    if(caso==1){
      this.traermismascotas();
      this.caso=1;
    }
    if(caso==2){
      this.caso=2;

      this.mascota=this.navparams.get('mascota');
      console.log
      this.succesiones=JSON.parse(this.mascota.pedigree);
      if (this.mascota.imagenes) {
        let imgname = this.mascota.imagenes.split(',')[0];
        this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`
      }      
    }
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  traermismascotas() {
    this.authservice.mismascostas(0).subscribe((data) => {
      this.mismascotas = data.json();
    }, err => {
      console.log(err);
    })
  }
  cambiarmascosta() {
    if (this.mascota.imagenes) {
      let imgname = this.mascota.imagenes.split(',')[0];
      this.path = `${SERVE_FILE_URI}storage/app/${this.mascota.id_usuario}/${this.mascota.id}/${imgname}`
    }
  }
  agregaritem() {
    console.log('aqui');
    let ds;
    let modalp;

    if (this.contador > 0) {
      let nombrem = this.siguientes;
      modalp = this.modal.create(SuccesionPage, {
        nombres: nombrem
      });

    } else {
      let nombrem = [this.mascota.nombre];
      console.log('nombres',nombrem);
      this.succesiones = [];
      modalp = this.modal.create(SuccesionPage, {
        nombres: nombrem
      });

      /*       this.succesiones = [];
      
            let padres;
            padres = [{ nombre: 'padrej' }, { nombre: 'masrej' }];
            this.succesiones.push({ item: padres }); */
    }

    modalp.present();
    modalp.onDidDismiss((data) => {
      if (data.successs) {
        this.contador = Object.keys(data.newitems).length;
        data.newitems.forEach(element => {
          this.siguientes.push(element.nombre);
        });
        this.succesiones.push({ item: data.newitems });
        console.log('s', this.succesiones);
        console.log('siguientes', this.siguientes);

      }
    });
  }

  guardarpedigree() {
    let alert = this.alertCtrl.create({

      title: 'Nombre del pedigree',
      message: 'Es el nombre con el q se identificara el pedigree en su lista de pedigree',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            if (!data.name) {
              return this.toastmsj('el campo nombre no puede estar vacio');
            } else {
              this.guardarpedigreef(data.name);
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
  guardarpedigreef(nombre) {
    let valoresenviar = {
      nombre: nombre,
      mascota_id: this.mascota.id,
      pedigree: JSON.stringify(this.succesiones)
    }
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando datos...',
      duration:10000

    });
    loading.present();
    this.authservice.registrarpedigree(valoresenviar).finally(() => {
      loading.dismiss();
    }).subscribe((resp) => {
      this.toastmsj(`pedigre ${resp.json()[0]['nombre']} creado exitosamente`);
      //
        this.viewCtrl.dismiss(true);
    }, error => {
      let err = error.json();
      for (let i in err) {
        if (err.hasOwnProperty(i)) {
          this.toastmsj(err[i]);
        }
      }
    });
  }
  toastmsj(mensaje = 'mensaje desconocido') {
    const toast = this.toastc.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }


}
