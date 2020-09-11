import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto:Producto = null;

  constructor(
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr:ToastrService,
    private router: Router
    ) { }

  ngOnInit(){
    const id =  this.activatedRoute.snapshot.params.id;
    this.productoService.datail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje,'Fallo',{
          timeOut:3000,positionClass:'toast-top-center'
        });
        this.router.navigate(['/'])
      }
    )
  }

  editar(){
    const id =  this.activatedRoute.snapshot.params.id;
    this.productoService.update(this.producto, id).subscribe(
      data => {
        this.toastr.success('Producto editado','Ok',{
          timeOut:3000,positionClass:'toast-top-center'
        });
        this.router.navigate(['/lista'])
      },  
      err =>{
        this.toastr.error(err.error.mensaje,'Fallo en la edicion',{
          timeOut:3000,positionClass:'toast-top-center'
        });
        this.router.navigate(['/'])
      }
    )
  }

}
