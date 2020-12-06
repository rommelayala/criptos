import { Component, OnInit } from '@angular/core';
import { InfoCriptosService } from 'src/app/services/info-criptos.service';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public infoService: InfoPaginaService,
              public infoCriptoService: InfoCriptosService) {
              }

  ngOnInit(): void {
  }

}
