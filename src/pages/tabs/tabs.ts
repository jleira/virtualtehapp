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
  tab2Root = ContactPage;
  tab3Root = AboutPage;
  tab4Root = ProfilePage;

  logeado: boolean;
  pagename='Home';
  constructor(
    public modalCtrl: ModalController,
    public authService: AuthProvider
  ) {

    this.authService.authUser.subscribe(jwt => {
      console.log(jwt);
      if (jwt) {
        console.log('true');
        
        this.logeado = true;
       } else {
        console.log('false');

        this.logeado = false;
      }
    });
    this.authService.checkLogin();
  }

  cargardata(pname){
    console.log('cargo', pname);
    this.pagename=pname;
  }

}
