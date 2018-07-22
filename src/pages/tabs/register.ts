import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
    selector:'page-register',
    templateUrl: 'register.html'

})
export class RegisterPage {

    constructor(
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public authService: AuthProvider
    ) {

    }
    cancelar() {
        this.viewCtrl.dismiss();
    }
    registro(value) {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Validando datos...'

        });
        loading.present();
        this.authService.registro(value).finally(() => {
            loading.dismiss();
        }).subscribe((resp) => {
            this.toastmsj(`Welcome ${resp['user']['first_name']}`);
        this.viewCtrl.dismiss();

        }, error => {
            let err = error.error;
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
            duration: 10000,
            position: 'bottom'
        });
        toast.present();
    }




}