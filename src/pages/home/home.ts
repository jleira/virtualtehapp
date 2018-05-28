import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../tabs/login';
import {FinderPage} from '../finder/finder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})
export class HomePage {
  logeado:boolean;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public authService: AuthProvider, public toastmsj: ToastController
  ) {
    this.logeado = false;
    this.authService.authUser.subscribe(jwt => {
      if (jwt) {
        this.logeado = true;
       } else {
        this.logeado = false;
      }
    });
    this.authService.checkLogin();

  }

  login() {
    let profileModal = this.modalCtrl.create(LoginPage, { userId: 8675309 });
    profileModal.present();
  }
  logout() {
    this.authService.logout();
  }

  findevery(){
    const toast = this.toastmsj.create({
      message: 'this option is comming soon ',
      duration: 5000,
      position: 'bottom',
      
    });
    toast.present();
  }
  findpeople(){
    if(!this.logeado){
      const toast = this.toastmsj.create({
        message: 'You must be logged in to use this',
        duration: 5000,
        position: 'top',
        cssClass:'ToastAlert',
        showCloseButton:true,
        dismissOnPageChange:true

      });
      toast.present();  
    }
    else{
      console.log('si enteo');
      this.navCtrl.push(FinderPage,{case:'people'});
    }

  }
  findpets(){
    console.log('findpets');
    this.navCtrl.push(FinderPage,{case:'mascotas'});

  }


}
