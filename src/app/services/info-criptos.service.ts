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
  criptosFiltrado: Producto[] = [];
 
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
          console.log(this.criptos.length + "criptos fueron cargadas");
          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angularfirebase-student-de052.firebaseio.com/productos/${id}.json`);
  }

   /**
   *
   * @param termino
   * Recibe el termino de busqueda y filtra la cripto en el array de criptos cargado
   */
  buscarCripto(termino: string) {

    if (this.criptos.length === 0) {
      // carga productos
      this.cargarCriptos().then(() => {
        // ejecute despues de tener los productos
        // Aplicar filtro
        this.filtrarCriptos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarCriptos(termino);

    }

    // console.log(this.productosFiltrado);
  }

  filtrarCriptos(termino: string) {

    this.criptosFiltrado = [];
    termino = termino.toLocaleUpperCase();

    this.criptos.forEach(crip => {
      const tituloUpper = crip.symbol.toLocaleUpperCase();

      if (crip.symbol.indexOf(termino) >= 0 || tituloUpper.indexOf(termino) >= 0) {
        this.criptosFiltrado.push(crip);
      }

    });
  }
}
