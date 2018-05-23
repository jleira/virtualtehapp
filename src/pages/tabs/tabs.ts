import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from './login';
import { AuthProvider } from '../../providers/auth/auth';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ProfilePage;

  logeado: boolean;
  pagename='Home';
  constructor(
    public modalCtrl: ModalController,
    public authService: AuthProvider
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

  cargardata(pname){
    console.log('cargo', pname);
    this.pagename=pname;
  }

}
