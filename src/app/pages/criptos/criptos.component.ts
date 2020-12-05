import { Component, OnInit } from '@angular/core';
import { CriptosService } from '../../services/info-criptos.service';

@Component({
  selector: 'app-criptos',
  templateUrl: './criptos.component.html',
  styleUrls: ['./criptos.component.css']
})
export class CriptosComponent implements OnInit {

  constructor(public infoCriptoService: CriptosService) {  }

  ngOnInit(): void {
  }

}
