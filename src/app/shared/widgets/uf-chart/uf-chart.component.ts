import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';


@Component({
  selector: 'app-uf-chart',
  templateUrl: './uf-chart.component.html',
  styleUrls: ['./uf-chart.component.scss']
})
export class UfChartComponent implements OnInit {

  indicatorUfModel: IndicatorModel = {
    version: '',
    autor: '',
    codigo: '',
    nombre: '',
    unidad_medida: '',
    serie: []
  }

  highcharts: typeof Highcharts = Highcharts;

  constructor(private services: IndicatorValuesService,
    private dialog: MatDialog) {

  }


  ngOnInit(): void {

    this.services.getIndicatorsUf().subscribe((res: any) => {
      this.indicatorUfModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      //INICIO DEL CHART
      Highcharts.chart('containerUf', {
        chart: {
          styledMode: true
        },
        title: {
          text: '$ ' + this.indicatorUfModel.serie[0].valor
        },
        credits: {
          enabled: false
        },
        yAxis:{
          title: {
            text: 'Rango de valores en miles de pesos para UF'
          }
        },
        xAxis: {
          categories: [
            this.indicatorUfModel.serie[0].fecha.substr(0, 10),
            this.indicatorUfModel.serie[1].fecha.substr(0, 10),
            this.indicatorUfModel.serie[2].fecha.substr(0, 10),
            this.indicatorUfModel.serie[3].fecha.substr(0, 10),
            this.indicatorUfModel.serie[4].fecha.substr(0, 10),
            this.indicatorUfModel.serie[5].fecha.substr(0, 10),
            this.indicatorUfModel.serie[6].fecha.substr(0, 10),
            this.indicatorUfModel.serie[7].fecha.substr(0, 10),
            this.indicatorUfModel.serie[8].fecha.substr(0, 10),
            this.indicatorUfModel.serie[9].fecha.substr(0, 10)

          ]
        },
        series: [{
          type: 'column',
          name: 'Valor alcanzado por la UF',
          data: [
            this.indicatorUfModel.serie[0].valor,
            this.indicatorUfModel.serie[1].valor,
            this.indicatorUfModel.serie[2].valor,
            this.indicatorUfModel.serie[3].valor,
            this.indicatorUfModel.serie[4].valor,
            this.indicatorUfModel.serie[5].valor,
            this.indicatorUfModel.serie[6].valor,
            this.indicatorUfModel.serie[7].valor,
            this.indicatorUfModel.serie[8].valor,
            this.indicatorUfModel.serie[9].valor
          ],
          color: '#1B4F72'
        },
        {
          type: 'pie',
          name: 'valor en pesos',
          data: [{
            name: this.indicatorUfModel.serie[0].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[0].valor,
            color: '#1B4F72'
          },
          {
            name: this.indicatorUfModel.serie[1].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[1].valor,
            color: '#21618C'
          },
          {
            name: this.indicatorUfModel.serie[2].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[2].valor,
            color: '#2874A6'
          },
          {
            name: this.indicatorUfModel.serie[3].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[3].valor,
            color: '#2E86C1'
          },
          {
            name: this.indicatorUfModel.serie[4].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[4].valor,
            color: '#3498DB'
          },
          {
            name: this.indicatorUfModel.serie[5].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[5].valor,
            color: '#5DADE2'
          },
          {
            name: this.indicatorUfModel.serie[6].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[6].valor,
            color: '#154360'
          },
          {
            name: this.indicatorUfModel.serie[7].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[7].valor,
            color: '#1A5276'
          },
          {
            name: this.indicatorUfModel.serie[8].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[8].valor,
            color: '#1F618D'
          },
          {
            name: this.indicatorUfModel.serie[9].fecha.substr(5,5),
            y: this.indicatorUfModel.serie[9].valor,
            color: '#2471A3'
          }],
          center: [0, 0],
          size: 40,
          showInLegend: false,
          dataLabels: {
            enabled: false
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
    this.services.getIndicatorsUf().subscribe((data: any) => {

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

}


