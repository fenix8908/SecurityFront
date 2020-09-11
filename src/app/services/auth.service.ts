import { JwtDTO } from './../models/jwt-dto';
import { LoginUsuario } from './../models/login-usuario';
import { Observable } from 'rxjs';
import { NuevoUsuario } from './../models/nuevo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private http:HttpClient) { }


  public nuevo(nuevoUsuario:NuevoUsuario):Observable<JwtDTO>{
    return this.http.post<any>(this.authURL + "nuevo",nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<any>{
    return this.http.post<JwtDTO>(this.authURL + "login/",loginUsuario);
  }
}
