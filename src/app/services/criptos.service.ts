import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoCriptosService } from './info-criptos.service';


@Injectable({
  providedIn: 'root'
})

export class CriptosService {

  cargando = true;
  criptos: any[];
  criptosValues: any[];
  criptosFiltrados: any[];
  criptosCartera: any[];
 

  constructor(private infocriptos: InfoCriptosService,
              private http: HttpClient) {
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
          resolve();
        });
    });
  }

  public buscarCripto(termino: string) {

    console.log('estoy buscando ' + termino);

    if ( (this.criptos == undefined) || this.criptos.length === 0) {
      // carga productos
      console.log('Voy a cargar las criptos');
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

  filtrarCriptos(simbolo: string) {

    // console.log('ya estoy en la funcion de filtrado buscando ' + simbolo);
    this.criptosFiltrados = [];
    simbolo = simbolo.toLocaleUpperCase();
    // console.log('Las criptos son ' + this.criptos);

    this.criptos.forEach(prod => {
      const simboloUpper = prod.symbol.toLocaleUpperCase();

      if (prod.symbol.indexOf(simbolo) >= 0 || simboloUpper.indexOf(simbolo) >= 0) {
         this.criptosFiltrados.push(prod);
       }
    });
  }


}
