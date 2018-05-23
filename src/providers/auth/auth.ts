import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { SERVER_URL } from "../../config";
import { AuthHttp } from "angular2-jwt";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

let apiUrl = SERVER_URL;

@Injectable()
export class AuthProvider {

  authUser = new ReplaySubject<any>(1);
  constructor(
    private tokenhttp: AuthHttp,
    public http: HttpClient,
    private storage: Storage
  ) {
  }
  checkLogin() {
    this.storage.get('jwt').then(token => {
      this.authUser.next(token);
    });
  }
  login(values: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/auth/login
    `, values).map((resp) => {
         this.guardardata(resp);        
         return resp;
      }, err => {
        if (err.status !== 401) {
          console.log(err);
        }
      })
  }
  logout() {
    this.storage.remove('mydata');
    this.storage.remove('jwt').then(() => {
      this.authUser.next(null);
    });
  }
  guardardata(resp){
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
          console.log(err);
        }
      })
  }

  mismascostas(id){
    return this.tokenhttp.get(`${SERVER_URL}api/pets/mismascotas/${id}`).map((data)=>{
      return data;
   },err=>{
     return err;
   })
  }

   registrarmascota(values:any): Observable<any> {
    return this.tokenhttp.post(`${apiUrl}/api/pets/agregar
    `, values).map((resp) => {
        return resp;
      }, err => {
        console.log(err);
        return err;
      })
  
   }
  
   buscar(key,values:any): Observable<any> {
    let endpoint;
    if(key=='people'){
      endpoint='api/find/people';
    }
    if(key=='mascotas'){
      endpoint='api/find/mascotas';
    }
    return this.tokenhttp.post(`${apiUrl}/${endpoint}`, values).map((resp) => {
        return resp;
      }, err => {
        console.log(err);
        return err;
      })
  
   }
 
   findbyid(id){
    return this.tokenhttp.get(`${SERVER_URL}api/finduser/findbyid/${id}`).map((data)=>{
      return data;
   },err=>{
     return err;
   })
 
  }

  seguirusuario(caso,id){
    let tipo='seguir';
    if(caso==2){
      tipo='dejardeseguir';
    }
    return this.tokenhttp.get(`${SERVER_URL}api/follow/${tipo}/${id}`).map((data)=>{
      return data;
   },err=>{
     return err;
   })
  }
  mensajes(idrecibe){
    return this.tokenhttp.get(`${SERVER_URL}api/chat/mensajes/${idrecibe}`).map((data)=>{
      return data;
   },err=>{
     return err;
   })
  }
  enviarmensaje(values: any): Observable<any>{

    return this.tokenhttp.post(`${apiUrl}/api/chat/mensajes/guardar
    `, values).map((resp) => {
        return resp;
      }, err => {
        console.log(err);
        return err;
      })
 
    
  }

}
