import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre:string = '';
  precio:number = null;

  constructor(
     private productoService:ProductoService,
     private toastr:ToastrService,
     private router:Router
     ) 
     { }

  ngOnInit(): void {
  }

  guardar(){
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto creado','Ok',{
          timeOut:3000,positionClass:'toast-top-center'
        });
        this.router.navigate(['/lista'])
      },  
      err =>{
        this.toastr.error(err.error.mensaje,'Fail',{
          timeOut:3000,positionClass:'toast-top-center'
        });
        //this.router.navigate(['/'])
      }
    )
  }

}
