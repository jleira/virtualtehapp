import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { SERVER_URL } from "../../config";
import { SERVE_FILE_URI } from "../../config";
import { AuthHttp, JwtHelper } from "angular2-jwt";
import { ToastController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '../../../node_modules/@angular/http';

let apiUrl = SERVER_URL + 'public/';

@Injectable()
export class AuthProvider {

  authUser = new ReplaySubject<any>(1);
  tokenexpired;
  fileTransfer: FileTransferObject = this.transfer.create();
  constructor(
    private tokenhttp: AuthHttp,
    private helper: JwtHelper,
    public http: HttpClient,
    private storage: Storage,
    private transfer: FileTransfer,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public http2:Http) {
    this.checkLogin();
  }
  checkLogin() {
    this.storage.get('jwt').then(token => {
      this.tokenexpired = this.helper.isTokenExpired(token);
      if (this.tokenexpired) {
        this.storage.remove('jwt');
        this.authUser.next(null);
      } else {
        this.authUser.next(token);
      }
    }).catch(() => {
      this.storage.remove('jwt');
      this.authUser.next(null);
      this.tokenexpired = true;
    });
  }
  login(values: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/auth/login
    `, values).map((resp) => {
        this.guardardata(resp);
        return resp;
      }, err => {
        if (err.status !== 401) {
          ////console.log(err);
        }
      })
  }
  logout() {
    this.storage.remove('mydata');
    this.storage.remove('jwt')
    this.authUser.next(null);
  }
  guardardata(resp) {
    this.storage.set('mydata',
      `{"id":${resp['user']['id']} ,"first_name":"${resp['user']['first_name']}","email":"${resp['user']['email']}","last_name":"${resp['user']['last_name']}","img":"${resp['user']['img']}"}`).then(() => {
        this.storage.set('jwt', resp['token']).then(() => {
          return this.authUser.next(resp['token']);
        })
      })
  };

  registro(values: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/auth/register
    `, values).map((resp) => {
        this.guardardata(resp);
        return resp;
      }, err => {
        if (err.status !== 401) {
          ////console.log(err);
        }
      })
  }

  mismascostas(id) {
    return this.tokenhttp.get(`${apiUrl}api/pets/mismascotas/${id}`).map((data) => {
      return data;
    }, err => {
      return err;
    })
  }
  misaccesorios(id) {
    return this.tokenhttp.get(`${apiUrl}api/find/misaccesorios/${id}`).map((data) => {
      //console.log(data);
      return data;
    }, err => {
      return err;
    })
  }

  registrarmascota(values: any): Observable<any> {
    return this.tokenhttp.post(`${apiUrl}/api/pets/agregar
    `, values).map((resp) => {
        return resp;
      }, err => {
        return err;
      })

  }
  registraraccesorio(values: any): Observable<any> {
    return this.tokenhttp.post(`${apiUrl}/api/guardar/accesorios
    `, values).map((resp) => {
        return resp;
      }, err => {
        return err;
      })
  }

  buscar(key, values: any): Observable<any> {
    console.log(key, 'key');
    let endpoint;
    if (this.tokenexpired) {
      if (key == 'people') {
        endpoint = 'api/find/people';
      }
      if (key == 'mascotas') {
        endpoint = 'api/find/mascotas2';
        values.vender = [1];

      }
      if (key == 'accesorios') {
        endpoint = 'api/find/accesoriosyservicios2';
        values.categoria = [1];
      }
      if (key == 'servicios') {
        endpoint = 'api/find/accesoriosyservicios2';
        values.categoria = [2];
      }
      if (key == 'todos') {
        endpoint = 'api/find/todos2';
        values.categoria = [1, 2];
      }
      if (key == 'adopcion') {
        endpoint = 'api/find/mascotas2';
        values.vender = [2];
      }
      if (key == 'todo') {
        endpoint = 'api/find/todo2';
      }

      return this.http.post(`${apiUrl}/${endpoint}`, values).finally(() => {
      }).map((resp) => {
        ////console.log('resp',resp);
        return resp;
      }, err => {
        return err;
      })
    } else {
      if (key == 'people') {
        endpoint = 'api/find/people';
      }
      if (key == 'mascotas') {
        endpoint = 'api/find/mascotas';
        values.vender = [1];

      }
      if (key == 'accesorios') {
        endpoint = 'api/find/accesoriosyservicios';
        values.categoria = [1];
      }
      if (key == 'servicios') {
        endpoint = 'api/find/accesoriosyservicios';
        values.categoria = [2];
      }
      if (key == 'todos') {
        endpoint = 'api/find/todos';
        values.categoria = [1, 2];
      }
      if (key == 'adopcion') {
        endpoint = 'api/find/mascotas';
        values.vender = [2];
      }
      if (key == 'todo') {
        endpoint = 'api/find/todo';
      }
      if (key == 'quiensigo') {
        endpoint = 'api/find/todoseguidores';
      }

      return this.tokenhttp.post(`${apiUrl}/${endpoint}`, values).finally(() => {
        ////console.log('salio');
      }).map((resp) => {
        ////console.log('resp',resp);
        return resp;
      }, err => {
        ////console.log(err);
        return err;
      })
    }


  }

  findbyid(id) {
    return this.tokenhttp.get(`${apiUrl}api/finduser/findbyid/${id}`).map((data) => {
      return data;
    }, err => {
      return err;
    })

  }

  seguirusuario(caso, id) {
    let tipo = 'seguir';
    if (caso == 2) {
      tipo = 'dejardeseguir';
    }
    return this.tokenhttp.get(`${apiUrl}api/follow/${tipo}/${id}`).map((data) => {
      return data;
    }, err => {
      return err;
    })
  }
  mensajes(idrecibe) {
    ////console.log('se ejecuta');
    return this.tokenhttp.get(`${apiUrl}api/chat/mensajes/${idrecibe}`).map((data) => {
      return data;
    }, err => {
      return err;
    })
  }
  enviarmensaje(values: any): Observable<any> {

    return this.tokenhttp.post(`${apiUrl}/api/chat/mensajes/guardar
    `, values).map((resp) => {
        return resp;
      }, err => {
        ////console.log(err);
        return err;
      })
  }

  enviarimagenchat(ruta) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();

    let datos={file:ruta};
    console.log(datos);
    return this.tokenhttp.post(`${SERVE_FILE_URI}public/api/fotochat`,datos).map(data => {
      this.handleError('Foto enviada');
      loading.dismiss();
      return true;
    }, err => {
      this.handleError(JSON.stringify(err));
      loading.dismiss();
      return false;
    })     
  }

  enviarimagenusuario(ruta) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();

    let datos={file:ruta};
    console.log(datos);
    return this.tokenhttp.post(`${SERVE_FILE_URI}public/api/fotousuario`,datos).map(data => {
      this.handleError('Foto enviada');
      loading.dismiss();
      return true;
    }, err => {
      this.handleError(JSON.stringify(err));
      loading.dismiss();
      return false;
    })
  }
  
  enviarimagen(ruta, pets) {
    console.log('ruta',ruta);
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();
    let datos={file:ruta};
    console.log('prueba',`${SERVE_FILE_URI}public/api/photoupload?id=${pets.id}`);
    console.log('dayos',pets,datos);
    return this.tokenhttp.post(`${SERVE_FILE_URI}public/api/photoupload?id=${pets.id}`,datos).finally(()=>
    {loading.dismiss();}
  ).map(data => {
      this.handleError('Foto enviada');
      return true;
    }, err => {
      console.log('error en el envio',JSON.stringify(err));
      this.handleError(JSON.stringify(err));
      return false;
    })    

  }


  enviarimagenproducto(ruta, pets) {
    
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();

    let datos={file:ruta};
    console.log(datos);
    return this.tokenhttp.post(`${SERVE_FILE_URI}public/api/photouploadaccesorio?id=${pets.id}`,datos).map(data => {
      this.handleError('Foto enviada');
      loading.dismiss();
      return true;
    }, err => {
      this.handleError(JSON.stringify(err));
      loading.dismiss();
      return false;
    })    
  }


  enviarimagenpedigree(ruta) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();
    let datos={file:ruta};
    console.log(datos);

    return this.tokenhttp.post( `${SERVE_FILE_URI}public/api/photouploadpedigree`,datos).map(data => {
      this.handleError('Foto enviada');
      loading.dismiss();
      return data;
    }, err => {
      this.handleError(JSON.stringify(err));
      loading.dismiss();
      return false;
    })

  }


  handleError(error: string) {
    let message: string;
    message = error;
    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  mispedigree(id) {
    return this.tokenhttp.get(`${apiUrl}api/find/mispedigree/${id}`).map((data) => {
      //console.log(data);
      return data;
    }, err => {
      return err;
    })
  }
  mispedigree2(id) {
    return this.http.get(`${apiUrl}api/find/pedigree/${id}`).map((data) => {
      return data;
    }, err => {
      return err;
    })
  }
  registrarpedigree(values: any): Observable<any> {
    return this.tokenhttp.post(`${apiUrl}/api/agregar/pedigree
    `, values).map((resp) => {
        return resp;
      }, err => {
        return err;
      })

  }
  traerchat() {
    return this.tokenhttp.get(`${apiUrl}api/chat/mensajes/usuario`).map((data) => {
      return data;
    }, err => {
      return err;
    })

  }
  eliminarchat(id) {
    return this.tokenhttp.get(`${apiUrl}api/chat/mensajes/eliminar/${id}`).map((data) => {
      return data;
    }, err => {
      return err;
    })
  }
  enviarmensajemascota(values) {
    return this.tokenhttp.post(`${apiUrl}/api/chat/mensajesmascota/guardar
    `, values).map((resp) => {
        return resp;
      }, err => {
        return err;
      })

  }

  pedigreemetter(id = 1608) {
    return this.http.get(`http://66.175.220.111/api/canines/${id}`).map((data) => {
      console.log(data);
      return data;
    });
  }
  crucepedigreemetter(id1, id2) {
    return this.http.get(`http://66.175.220.111/api/canines/${id1}?complex=${id2}`).map((data) => {
      console.log(data);
      return data;
    });
  }
  mascotasmetter(nombre) {
    console.log('nmb http normal', nombre);
    return this.http.get(`http://66.175.220.111/api/canines?utf8=true&q[name_or_lof_cont]=${nombre}`).map((data) => {
      return data;
    });
  }

  mascotasmettermacho(nombre) {
    console.log('nmb', nombre);
    return this.http.get(`http://66.175.220.111/api/canines?utf8=true&q[name_or_lof_cont]=${nombre}&q[gender_eq]=1`).map((data) => {
      return data;
    });
  }

  mascotasmetterhembra(nombre) {
    console.log('nmb', nombre);
    return this.http.get(`http://66.175.220.111/api/canines?utf8=true&q[name_or_lof_cont]=${nombre}&q[gender_eq]=0`).map((data) => {
      return data;
    });
  }

  cambiarpass(values: any): Observable<any> {
    return this.tokenhttp.post(`${apiUrl}/api/auth/cambiarpass
    `, values).map((resp) => {
        return resp;
      }, err => {
        return err;
      })

  }
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}