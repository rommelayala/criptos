import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriptoOperacionInterface } from '../interfaces/criptoOperacion.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })

export class InfoCriptosService {

  constructor(private http: HttpClient) {
    this.cargarCriptosCoinbase();
    // this.filtrarCriptosCartera();
    this.filtrarOperacionCriptosCoinbase();
  }

  simbolosParaFiltrar: any[] = ['usdc', 'xtz', 'cgld'];

  cargando = true;
  criptos: any[];
  criptosValues: any[];
  criptosFiltrado: Producto[] = [];
  criptosCartera: Producto[] = [];
  criptosCarteraOperacionesVigentes: CriptoOperacionInterface[] = [];
  criptosCarteraOperacionesCulminadas: CriptoOperacionInterface[] = [];


  operacionVigenteTezos: CriptoOperacionInterface = [
    {
      symbol: 'XTZ',
      name: 'Tezos',
      plataforma: 'Coinbase',
      monedaFiat: 'EUR',
      // precios
      precioCompraUnitario: parseFloat('1,98718369'),
      precioCostoUnitarioReal: parseFloat('1,98718369'),
      // fechas
      fechaCompra: new Date('2020-12-03 10:32'),
      comisionCompra: parseFloat('0,00'),
      comisionVenta: parseFloat('0,00'),
      // utilidad
      utilidadMoneda: parseFloat('0,00'),
      utilidadPorcentaje: parseFloat('0,00')
    }, {
      symbol: 'XTZ',
      name: 'Tezos',
      plataforma: 'Coinbase',
      monedaFiat: 'EUR',
      // precios
      precioCompraUnitario: parseFloat('1,98591016'),
      precioCostoUnitarioReal: parseFloat('1,98591016'),
      // fechas
      fechaCompra: new Date('2020-12-03 10:32'),
      comisionCompra: parseFloat('0,00'),
      comisionVenta: parseFloat('0,00'),
      // utilidad
      utilidadMoneda: parseFloat('0,00'),
      utilidadPorcentaje: parseFloat('0,00')
    }
  ];

  public cargarCriptosCoinbase() {
    return new Promise((resolve, reject) => {
      this.http.get('https://www.coinbase.com/api/v2/assets/search?base=usd&country=ES&limit=100').subscribe((resp: any[]) => { // guarda los values del response
        this.criptosValues = Object.values(resp);
        // del array de 2 elemetos dame el segundo elemento y guaradlos en criptos
        console.log('cargando las criptos a criptos desde info-criptoService.ts.cargarCriptosCoinbase linea 66');
        this.criptos = this.criptosValues[1];
        this.cargando = false;
        console.log(this.criptos.length + 'criptos fueron cargadas desde info-criptoService.ts.cargarCriptosCoinbase lin 69');
        resolve();
      });
    });
  }
  /**
* funcion hecha para coinbase queda pendiente pasarle la plataforma como parametro ejem coinbasePro, self, etc
*/
  filtrarOperacionCriptosCoinbase() {
    console.log('hola desde filtrar operacion desde coinbase filtrarOperacionCriptosCoinbase linea 78');
    console.log(this.criptos);

    if (this.criptos === undefined) {
      console.log('Carganndo --- filtrarOperacionCriptosCoinbase.L82 ' + this.criptos);
      this.criptos = this.cargarCriptosCoinbase().then(tratarCriptos => { // this.criptosCarteraOperacionesVigentes = [];
        this.criptos.forEach(criptoDeTodasLascriptos => {
          // const simboloUpperOperacion = cartera.symbol.toLocaleUpperCase();
          // console.log('iterando elementos en operaciones de coinbase filtrarOperacionCriptosCoinbase.L87 ' + criptoDeTodasLascriptos.image_url);
          this.operacionVigenteTezos.forEach(operacionResultante => {
            const simboloUpper = operacionResultante.symbol.toLocaleUpperCase();
            // console.log('el simbolo Upper filtrarOperacionCriptosCoinbase.L90 ' + simboloUpper);
            if (criptoDeTodasLascriptos.symbol.indexOf(operacionResultante.symbol) === 0) {
              console.log('filtrarOperacionCriptosCoinbase.l92 poniendo ' + operacionResultante.precioCompraUnitario);
              this.criptosCarteraOperacionesVigentes.push(operacionResultante);
            }
          });

        });
        // tslint:disable-next-line:max-line-length
        console.log('Las criptos filtradas de coinbase en mis operaciones vigentes filtrarOperacionCriptosCoinbase.L104' + this.criptosCarteraOperacionesVigentes);
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
      this.cargarCriptosCoinbase().then(() => {
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

  filtrarCriptosCartera() {

    if (this.criptos === undefined) {
      console.log('Carganndo desde filtrarCriptoCartera linea 149 ' + this.criptos);
      this.criptos = this.cargarCriptosCoinbase().then(mensaje => {
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

        console.log('Las criptos filtradas que son mi cartera infoCriptoserviceL166 ' + this.criptosCartera);
      });
    }
  }


}
