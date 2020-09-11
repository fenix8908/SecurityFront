import { LoginUsuario } from './../../models/login-usuario';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  islogged = false;
  isLoggerFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errorMensaje: string;

  constructor
    (
      private tokenService: TokenService,
      private authService: AuthService,
      private router: Router,
      private toastService: ToastrService
    ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.islogged = true;
      this.isLoggerFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.islogged = true

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastService.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(["/"]);
      },
      err => {
        this.islogged = false;
        this.errorMensaje = err.error.message;
        this.toastService.error(this.errorMensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }


}
