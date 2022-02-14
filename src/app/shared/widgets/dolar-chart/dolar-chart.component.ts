import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';

@Component({
  selector: 'app-dolar-chart',
  templateUrl: './dolar-chart.component.html',
  styleUrls: ['./dolar-chart.component.scss']
})
export class DolarChartComponent implements OnInit {

  indicatorDolarModel: IndicatorModel = {
    version: '',
    autor: '',
    codigo: '',
    nombre: '',
    unidad_medida: '',
    serie: []
  }

  highcharts: typeof Highcharts = Highcharts;

  constructor(private services: IndicatorValuesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.services.getIndicatorsDolar().subscribe((res: any) => {
      this.indicatorDolarModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      console.log(this.indicatorDolarModel);

      //INICIO DEL CHART
      Highcharts.chart('containerDolar', {
        chart: {
          styledMode: true
        },
        title: {
          text: '$ ' + this.indicatorDolarModel.serie[0].valor
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: 'Rango de fluctuación del dolar'
          }
        },
        xAxis: {
          categories: [
            this.indicatorDolarModel.serie[0].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[1].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[2].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[3].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[4].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[5].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[6].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[7].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[8].fecha.substr(0, 10),
            this.indicatorDolarModel.serie[9].fecha.substr(0, 10)

          ]
        },
        series: [
          {
            type: 'column',
            name: this.indicatorDolarModel.serie[0].fecha.substr(5, 5),
            data: [
              this.indicatorDolarModel.serie[0].valor,
              this.indicatorDolarModel.serie[1].valor,
              this.indicatorDolarModel.serie[2].valor,
              this.indicatorDolarModel.serie[3].valor,
              this.indicatorDolarModel.serie[4].valor,
              this.indicatorDolarModel.serie[5].valor,
              this.indicatorDolarModel.serie[6].valor,
              this.indicatorDolarModel.serie[7].valor,
              this.indicatorDolarModel.serie[8].valor,
              this.indicatorDolarModel.serie[9].valor
            ],
            color: '#21618C'
          },
          {
            type: 'spline',
            name: 'linea comparativa',
            data: [
              this.indicatorDolarModel.serie[0].valor,
              this.indicatorDolarModel.serie[1].valor,
              this.indicatorDolarModel.serie[2].valor,
              this.indicatorDolarModel.serie[3].valor,
              this.indicatorDolarModel.serie[4].valor,
              this.indicatorDolarModel.serie[5].valor,
              this.indicatorDolarModel.serie[6].valor,
              this.indicatorDolarModel.serie[7].valor,
              this.indicatorDolarModel.serie[8].valor,
              this.indicatorDolarModel.serie[9].valor

            ],
            marker: {
              lineWidth: 2,
              lineColor: 'red',
              fillColor: 'red'
            }
          }]
      });
    });//FIN SUBSCRIBE

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  checkRecord(): void {
    this.services.getIndicatorsDolar().subscribe((data: any) => {

      this.dialog.open(RecordTableComponent, {
        panelClass: 'custom-modalbox',
        data: {
          codigo: data.codigo,
          serie: data.serie
        }
      });
      console.log(data.serie[0].fecha);
    });
  }

}//Fin de init


