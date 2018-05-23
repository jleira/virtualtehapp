import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({

  templateUrl: 'nmascota.html'

})
export class NmascotaPage {


  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public authService: AuthProvider
  ) {

  }

  cancelar() {
    this.viewCtrl.dismiss(false);
  }

  registrar(values: any) {
    console.log(values);
    if(values.precio==""){
      values.precio==0;
    }
    if(values.vender){
      if(values.precio==0){
        this.toastmsj('El precio debe ser mayor que a cero');
        return false;
      } 
    }


    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando datos...'

    });
    loading.present();
    this.authService.registrarmascota(values).finally(() => {
      loading.dismiss();
    }).subscribe((resp) => {
      
      this.toastmsj(`mascota ${resp.json()[0]['nombre']} creada exitosamente`);
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
  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}