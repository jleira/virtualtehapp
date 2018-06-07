import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../tabs/login';
import {FinderPage} from '../finder/finder';
import {SERVER_URL} from '../../config';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})
export class HomePage {
  logeado:boolean;
  urlimg=SERVER_URL;
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
    const toast = this.toastmsj.create({
      message: 'Bye :)',
      duration: 5000,
      position: 'bottom',
      cssClass:'ToastAlert',
      showCloseButton:true,
      dismissOnPageChange:false

    });
    toast.present();  
    this.login();
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
      this.navCtrl.push(FinderPage,{case:'people'});
    }

  }
  findpets(caso){
    this.navCtrl.push(FinderPage,{case:caso});
  }
  findaccesories(){
    this.navCtrl.push(FinderPage,{case:'accesorios'});    
  }

findservices(){
  this.navCtrl.push(FinderPage,{case:'servicios'});    
  
}
}
