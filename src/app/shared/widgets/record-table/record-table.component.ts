import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss']
})
export class RecordTableComponent {


  currency: any = '';
  //contenedor de resp api enviada desde el area-chart.component.js
  dataSource: any = [];
  //renderizado de columnas de mattable
  displayedColumns: string[] = ['dataSource.fecha', 'dataSource.valor']

  constructor(
    private dialogRef: MatDialogRef<RecordTableComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      serie: any, codigo: any
    }) {
      //llenado del datasource con response de la api desde T-chart con 10registros
      for (let i = 0; i <= 9; i++) {
        this.dataSource[i] = data.serie[i];
      }
    

    this.currency = data.codigo;
  }

}


