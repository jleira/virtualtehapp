import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AuthProvider} from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(private platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen, public authService:AuthProvider) {
    this.authService.authUser.subscribe(jwt => {
      console.log(jwt);
      if (jwt) {
        this.rootPage=TabsPage;        
       } else {
        this.rootPage=HomePage;        
      }
    });
    this.authService.checkLogin();
    this.initializeApp();

  }
  
  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100 - 1000);
//      statusBar.styleDefault();
  //    splashScreen.hide();
    });
  } 

}
