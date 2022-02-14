import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';
import { SeriesModel } from 'src/app/Interfaces/SeriesInterface';
import { Chart } from 'highcharts';

@Component({
  selector: 'app-ivp-chart',
  templateUrl: './ivp-chart.component.html',
  styleUrls: ['./ivp-chart.component.scss']
})
export class IvpChartComponent implements OnInit {

  indicatorIvpModel: IndicatorModel = {
    version: '',
    autor: '',
    codigo: '',
    nombre: '',
    unidad_medida: '',
    serie: []
  }

  seriesModel: SeriesModel = {
    fecha: '',
    valor: ''
  };

  numserie: number = 0;

  Highcharts: typeof Highcharts = Highcharts;

  constructor(private services: IndicatorValuesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.services.getIndicatorsIvp().subscribe((res: any) => {

      //mapeo del observable
      this.seriesModel = {
        fecha: res['serie'].map((f: any) => f.fecha),
        valor: res['serie'].map((f: any) => f.valor)
      }

      const difValue = Number(this.seriesModel.valor[0]) - Number(this.seriesModel.valor[1]);
      const difValueFormat = difValue.toString().substr(0,4);
      console.log(difValueFormat);

      this.indicatorIvpModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      //inicio Chart
       Highcharts.chart('containerIvp',{
        chart: {
          styledMode: true,
          type: 'areaspline'
        },
        title: {
          text: '$ ' + this.seriesModel.valor[0]
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            '#FFFFFF'
        },
        xAxis: {
          categories: [
            this.seriesModel.fecha[0].substr(0, 10),
            this.seriesModel.fecha[1].substr(0, 10),
            this.seriesModel.fecha[2].substr(0, 10),
            this.seriesModel.fecha[3].substr(0, 10),
            this.seriesModel.fecha[4].substr(0, 10),
            this.seriesModel.fecha[5].substr(0, 10),
            this.seriesModel.fecha[6].substr(0, 10),
            this.seriesModel.fecha[7].substr(0, 10),
            this.seriesModel.fecha[8].substr(0, 10),
            this.seriesModel.fecha[9].substr(0, 10)
          ],
          plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
          }]
        },
        yAxis: {
          title: {
            text: 'Rango de valores IVP'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: ' Dif. entre hoy y ayer $' + difValueFormat + 'Pesos'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.5
          }
        },
        series: [{
          name: 'IVP',
          type: 'line',
          data: [
            this.seriesModel.valor[0],
            this.seriesModel.valor[1],
            this.seriesModel.valor[2],
            this.seriesModel.valor[3],
            this.seriesModel.valor[4],
            this.seriesModel.valor[5],
            this.seriesModel.valor[6],
            this.seriesModel.valor[7],
            this.seriesModel.valor[8],
            this.seriesModel.valor[9]

          ]
        }]
      });
      //Fin Chart


      //INICIO DEL CHART
    });//FIN SUBSCRIBE

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }//Fin de init

  checkRecord(): void {
    this.services.getIndicatorsIvp().subscribe((data: any) => {

      this.dialog.open(RecordTableComponent, {
        panelClass: 'custom-modalbox',
        data: {
          codigo: data.codigo,
          serie: data.serie
        }
      });
    });
  }

}


