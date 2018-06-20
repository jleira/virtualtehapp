import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import {LoginPage} from '../pages/tabs/login';
import { RegisterPage } from '../pages/tabs/register';
import {NmascotaPage} from '../pages/profile/nmascota';
import {DetallesPage} from '../pages/profile/detalle';
import {FinderPage} from '../pages/finder/finder';
import {ImagenesPage} from '../pages/profile/imagenes';
import { DetallesusuarioPage } from '../pages/profile/detalleusuario';
import {ChatRoomPage} from '../pages/chat-room/chat-room';
import { NewPedigreePage } from '../pages/about/new-pedigree';
import { AccesoriosPage } from '../pages/accesorios/accesorios';
import { NaccesorioPage } from '../pages/accesorios/naccesorio';
import { SuccesionPage } from '../pages/about/succesion';
import { ColorpickerPage } from '../pages/about/new-pedigree';



import { HttpClientModule } from '@angular/common/http';

import { Http, RequestOptions, HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule, Storage} from "@ionic/storage";
import {JwtHelper, AuthConfig, AuthHttp} from "angular2-jwt";
import { AuthProvider } from '../providers/auth/auth';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://192.168.100.60:3001', options: {} };

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    NmascotaPage,
    DetallesPage,
    FinderPage,
    ImagenesPage,
    DetallesusuarioPage,
    ChatRoomPage,
    NewPedigreePage,
    AccesoriosPage,
    NaccesorioPage,
    SuccesionPage,
    ColorpickerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    NmascotaPage,
    DetallesPage,
    FinderPage,
    ImagenesPage,
    DetallesusuarioPage,
    ChatRoomPage,
    NewPedigreePage,
    AccesoriosPage,
    NaccesorioPage,
    SuccesionPage,
    ColorpickerPage
  ],
  providers: [
    StatusBar,
    HttpClientModule,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    Camera,
    File,
    FileTransfer
  ]
})
export class AppModule { }
