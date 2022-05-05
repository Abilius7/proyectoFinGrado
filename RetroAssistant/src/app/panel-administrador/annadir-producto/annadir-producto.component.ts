import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-annadir-producto',
  templateUrl: './annadir-producto.component.html',
  styleUrls: ['./annadir-producto.component.css']
})
export class AnnadirProductoComponent implements OnInit {

  constructor(private productosService: ProductosService, private snack: MatSnackBar) { }

  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  arrayObjetos: string[] = [];
  objetoNuevo: string = '';

  ngOnInit(): void {
  }
  annadirProducto() {
    if (this.nombre.length > 0 && this.descripcion.length > 0 && (this.precio)>0) {
      let snackBarRef = this.snack.open('Quieres annadir el producto', 'Aceptar');

      snackBarRef.onAction().subscribe(() => {

        this.productosService.annadirProducto(this.nombre, this.descripcion, this.precio, this.imagen, this.arrayObjetos)
          .subscribe((response) => {
            if (!response) {
              alert('No ha podido annadir el producto correctamente');
            } else {
              location.reload();

            }
          });
      });

      snackBarRef.afterDismissed().subscribe(() => {
        console.log('The snackbar was dismissed');
      });

    } else {
      alert('Porfavor introduce valores validos');
    }

  }

  annadirObjeto() {
    this.arrayObjetos.push(this.objetoNuevo);
    this.objetoNuevo = '';
  }
  eliminarObjeto(indice: number) {
    this.arrayObjetos.splice(indice, 1);
  }
}
