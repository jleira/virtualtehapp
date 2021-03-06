import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import {PedigremetterPage } from '../pedigremetter/pedigremetter';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;
  tab4Root = ProfilePage;
  tab5Root = PedigremetterPage;

  logeado: boolean;
  pagename='Home';
  constructor(
    public modalCtrl: ModalController,
    public authService: AuthProvider
  ) {
    this.authService.checkLogin();
    this.authService.authUser.subscribe(jwt => {
      if (jwt) {        
        this.logeado = true;
       } else {
        this.logeado = false;
      }
    });
    this.authService.checkLogin();
  }

  cargardata(pname){
    this.pagename=pname;
  }

}
