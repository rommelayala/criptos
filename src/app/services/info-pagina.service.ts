import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[];

  constructor(private http: HttpClient) {
    // console.log('servicio de info pagina se ha cargado');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // leer Json
    this.http.get('assets/data/data-pagina.json')
      .subscribe(resp => {

        this.cargada = true;
        this.info = resp;
        // console.log(resp);
      });
  }

  private cargarEquipo() {
    const dataFirebase = this.http.get('https://angularfirebase-student-de052.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
      this.equipo = resp;
      // console.log(this.equipo);
    });

  }

}
