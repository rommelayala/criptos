import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class InfoCriptosService {

  cargando = true;
  productos: Producto[];
  productosFiltrado: Producto[] = [];
  criptos: any[];
  criptosValues: any[];
 
    constructor(private http: HttpClient) {
    this.cargarCriptos();
  }

  public cargarCriptos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://www.coinbase.com/api/v2/assets/search?base=usd&country=ES&limit=100')
        .subscribe((resp: any[]) => {
          // guarda los values del response
          this.criptosValues = Object.values(resp);
          // del array de 2 elemetos dame el segundo elemento y guaradlos en criptos
          this.criptos = this.criptosValues[1];
          this.cargando = false;
          console.log(this.criptos.length);
          resolve();
        });
    });
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angularfirebase-student-de052.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          // console.log(this.productos);
          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angularfirebase-student-de052.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // carga productos
      this.cargarProductos().then(() => {
        // ejecute despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);

    }

    // console.log(this.productosFiltrado);
  }

  filtrarProductos(termino: string) {

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }

    });
    // throw new Error('Method not implemented.');
  }

}
