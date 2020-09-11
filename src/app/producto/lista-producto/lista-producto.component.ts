import { TokenService } from './../../services/token.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  roles: string[];
  isAdmin = false;
  productos: Producto[] = [];
  productoDetalle: Producto = {
    id: 0,
    nombre: '',
    precio: 0
  };
  modalRef: BsModalRef;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    console.log(this.roles);
    this.roles.forEach(rol => {
      if (rol === "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    })
  }
  openModal(template: TemplateRef<any>, id) {
    console.log(id);
    this.modalRef = this.modalService.show(template);
    this.productoService.datail(id).subscribe(
      data => {
        this.productoDetalle = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fallo el detalle', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  cargarProductos() {
    this.productoService.lista()
      .subscribe(data => {
        this.productos = data
      },
        err => {
          console.error(err)
        }
      )
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'Ok', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fallo', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    )
  }


}
