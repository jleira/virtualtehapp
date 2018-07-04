import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { SERVER_URL } from "../../config";
import { SERVE_FILE_URI } from "../../config";
import { AuthHttp, JwtHelper } from "angular2-jwt";
import { ToastController, LoadingController } from 'ionic-angular';
import { File, DirectoryEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import 'rxjs/Rx';
import 'rxjs/add/operator/map';

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
    private file: File,
    private transfer: FileTransfer,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
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
      `{"id":${resp['user']['id']} ,"first_name":"${resp['user']['first_name']}","email":"${resp['user']['email']}","last_name":"${resp['user']['last_name']}"}`).then(() => {
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
        values.categoria = [1, 2];
      }
      if (key == 'servicios') {
        endpoint = 'api/find/accesoriosyservicios2';
        values.categoria = [1, 2];
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
        ////console.log('salio');
      }).map((resp) => {
        ////console.log('resp',resp);
        return resp;
      }, err => {
        ////console.log(err);
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

  enviarimagen(ruta, pets) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();
    return this.storage.get('jwt').then((jwt) => {
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'pets',
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': undefined
        },
        mimeType: 'image/*',
        params: {
          idmascota: pets.id
        }
      }

      return this.fileTransfer.upload(ruta, `${SERVE_FILE_URI}public/api/photoupload?id=${pets.id}`, options)
        .then((data) => {
          //console.log(data);
          this.handleError('Foto enviada');
          loading.dismiss();
          return true;
        }, (err) => {
          this.handleError(JSON.stringify(err));
          //console.log(err);
          loading.dismiss();
          return true;
        })

    }, err => {
      loading.dismiss();
      this.handleError('Debe estar logeado antes, si el problema persiste cierre y vuelva a inciar sesion');
      ////console.log('err',err);
      return true;

    })

  }


  enviarimagenproducto(ruta, pets) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();
    return this.storage.get('jwt').then((jwt) => {
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'pets',
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': undefined
        },
        mimeType: 'image/*',
        params: {
          idmascota: pets.id
        }
      }

      return this.fileTransfer.upload(ruta, `${SERVE_FILE_URI}public/api/photouploadaccesorio?id=${pets.id}`, options)
        .then((data) => {
          //console.log(data);
          this.handleError('Foto enviada');
          loading.dismiss();
          return true;
        }, (err) => {
          this.handleError(JSON.stringify(err));
          //console.log(err);
          loading.dismiss();
          return true;
        })

    }, err => {
      loading.dismiss();
      this.handleError('Debe estar logeado antes, si el problema persiste cierre y vuelva a inciar sesion');
      //console.log('err', err);
      return true;

    })

  }


  enviarimagenpedigree(ruta) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Enviando foto ...'
    });
    loading.present();
    return this.storage.get('jwt').then((jwt) => {
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'pedigree',
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': undefined
        },
        mimeType: 'image/*',
      }

      return this.fileTransfer.upload(ruta, `${SERVE_FILE_URI}public/api/photouploadpedigree`, options)
        .then((data) => {
          this.handleError('Foto guardada');
          loading.dismiss();
          return data;
        }, (err) => {
          this.handleError(JSON.stringify(err));
          //console.log(err);
          loading.dismiss();
          return true;
        })

    }, err => {
      loading.dismiss();
      this.handleError('Debe estar logeado antes, si el problema persiste cierre y vuelva a inciar sesion');
      //console.log('err', err);
      return true;

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
    return this.http.get(`http://66.175.220.111/api/canines/454?complex=${id}`).map((data) => {
      console.log(data);
     return data;
    });
  }
  mascotasmetter(nombre) {
    console.log('nmb',nombre);
    return this.http.get(`http://66.175.220.111/api/canines?utf8=true&q[name_or_lof_cont]=${nombre}`).map((data) => {
     return data;
    });
  }

}