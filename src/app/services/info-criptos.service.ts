import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })

export class InfoCriptosService {

  cargando = true;
  criptos: any[];
  criptosValues: any[];
  criptosFiltrado: Producto[] = [];
  criptosCartera: Producto[] = [];

  simbolosParaFiltrar: any[] = [
    'usdc',
    'xtz' ];

  constructor(private http: HttpClient) {
    this.cargarCriptos();
    this.filtrarCriptosCartera();
  }

  public cargarCriptos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://www.coinbase.com/api/v2/assets/search?base=usd&country=ES&limit=100').subscribe((resp: any[]) => { 
        // guarda los values del response
        this.criptosValues = Object.values(resp);
        // del array de 2 elemetos dame el segundo elemento y guaradlos en criptos
        console.log("cargando las criptos a criptos");
        this.criptos = this.criptosValues[1];
        this.cargando = false;
        console.log(this.criptos.length + "criptos fueron cargadas");
        resolve();
      });
    });
  }

  async filtrarCriptosCartera() {

    if (this.criptos === undefined) {
      console.log('Carganndo ' + this.criptos);
      this.criptos = this.cargarCriptos().then(mensaje => {
        this.criptosCartera = [];
        this.simbolosParaFiltrar.forEach(cartera => {
          const simboloUpperCartera = cartera.toLocaleUpperCase();
          // console.log("iterando elementos de cartera");
          this.criptos.forEach(prod => {
            // console.log("iterando en todas las criptos");
            // me aseguro que el simbolo venga en mayusculas
            const simboloUpper = prod.symbol.toLocaleUpperCase();
            if (prod.symbol.indexOf(simboloUpperCartera) === 0 || simboloUpper.indexOf(simboloUpperCartera) === 0) {
              this.criptosCartera.push(prod);
              // console.log('poniendo ' + prod.symbol);
            }
          });
        });

        console.log('Las criptos filtradas que son mi cartera' + this.criptosCartera);
      });
    }
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
      this.cargarCriptos().then(() => {
        this.filtrarCriptos(termino);
      });
    } else {
      this.filtrarCriptos(termino);

    }
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
