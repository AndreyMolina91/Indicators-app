import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { SeriesModel } from 'src/app/Interfaces/SeriesInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';

@Component({
  selector: 'app-tasa-desempleo-chart',
  templateUrl: './tasa-desempleo-chart.component.html',
  styleUrls: ['./tasa-desempleo-chart.component.scss']
})
export class TasaDesempleoChartComponent implements OnInit {

  indicatorTasaDesempleoModel: IndicatorModel = {
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

  highcharts: typeof Highcharts = Highcharts;

  constructor(private services: IndicatorValuesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.services.getIndicatorsTasaDesempleo().subscribe((res: any) => {

      //mapeo del observable
      this.seriesModel = {
        fecha: res['serie'].map((f: any) => f.fecha),
        valor: res['serie'].map((f: any) => f.valor)
      }

      const difValue = Number(this.seriesModel.valor[0]) - Number(this.seriesModel.valor[1]);
      const difValueFormat = difValue.toString().substr(0,4);
      console.log(difValueFormat);

      this.indicatorTasaDesempleoModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      console.log(this.indicatorTasaDesempleoModel);

      //INICIO DEL CHART
      Highcharts.chart('containerTasaDesempleo', {
        chart: {
          styledMode: true,
          type: 'areaspline'
        },
        title: {
          text: '% ' + this.seriesModel.valor[0]
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
            text: 'Fluctuación en el % de desempleo'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: ' Linea comparativa'
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
          name: 'Tasa de desempleo Chile',
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
      //FIN CHART
    });//FIN SUBSCRIBE

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  checkRecord(): void {
    this.services.getIndicatorsTasaDesempleo().subscribe((data: any) => {

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
