import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUsuaio: string = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuaio = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUsuaio = ''; 
    }
  }

}
