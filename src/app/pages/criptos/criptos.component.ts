import { Component, OnInit } from '@angular/core';
import { InfoCriptosService } from '../../services/info-criptos.service';

@Component({
  selector: 'app-criptos',
  templateUrl: './criptos.component.html',
  styleUrls: ['./criptos.component.css']
})
export class CriptosComponent implements OnInit {

  constructor(public infoCriptoService: InfoCriptosService
              ) {
              }

  ngOnInit(): void {
  }

}
