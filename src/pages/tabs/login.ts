import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavController } from 'ionic-angular';
import { RegisterPage } from '../tabs/register';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser'; 
@Component({
  selector:'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {


  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public authService: AuthProvider,
    private iap: InAppBrowser
  ) {

  }
  openLink(){
    this.iap.create("http://167.114.185.216/servicios54/public/passwordrecovery","_blank");
  }
  cancelar() {
    this.viewCtrl.dismiss();
  }
  borrarlocal() {
    this.authService.logout();
  }
  registrar() {
    this.navCtrl.push(RegisterPage);
  }

  login(values: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Validando datos...'

    });
    loading.present();
    this.authService.login(values).finally(() => {
      loading.dismiss();
    }).subscribe((resp) => {
      this.toastmsj(`Welcome ${resp['user']['first_name']}`);
      this.viewCtrl.dismiss();
    }, error => {
      let message: string;
      if (error.status && error.status === 401) {
        message = 'Usuario y/o contraseña incorrecto';
      }
      else {
        message = `Unexpected error: ${error.statusText}`;
      }
      this.toastmsj(message);
      console.log(error);
    });

  }
  toastmsj(msj: string) {

    const toast = this.toastCtrl.create({
      message: msj,
      duration: 10000,
      position: 'bottom',
      showCloseButton:true
    });
    toast.present();
  }

}