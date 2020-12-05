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
 
   simbolosParaFiltrar: any[] = [ 'BTC', 'ETH', 'COMP', 'MKR'];
   simbolo = 'BTC';


  constructor(private infocriptos: InfoCriptosService) {
    this.buscarCripto(this.simbolo);
  }

  public buscarCripto(termino: string) {

    console.log("gordo de mierda");
    
    if (this.criptos.length === 0) {
      // carga productos
      this.infocriptos.cargarCriptos().then(() => {
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
    this.criptosFiltrados = [];
    simbolo = simbolo.toLocaleUpperCase();

    this.criptos.forEach(prod => {
      const simboloUpper = prod.simbolo.toLocaleUpperCase();

      if (prod.simbolo.indexOf(simbolo) >= 0 || simboloUpper.indexOf(simbolo) >= 0) {
        this.criptosFiltrados.push(prod);
      }
    });

    console.log(this.criptosFiltrados);
  }

}
