import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { SeriesModel } from 'src/app/Interfaces/SeriesInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';


@Component({
  selector: 'app-euro-chart',
  templateUrl: './euro-chart.component.html',
  styleUrls: ['./euro-chart.component.scss']
})
export class EuroChartComponent implements OnInit {

  seriesModel: SeriesModel = {
    fecha: '',
    valor: ''
  };

  indicatorEuroModel: IndicatorModel = {
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

    this.services.getIndicatorsEuro().subscribe((res: any) => {

      this.seriesModel = {
        fecha: res['serie'].map((f: any) => f.fecha),
        valor: res['serie'].map((f: any) => f.valor)
      }

      this.indicatorEuroModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      //INICIO DEL CHART
      Highcharts.chart({
        chart: {
          styledMode: true,
          renderTo: 'containerEuro',
          type: 'area'
        },
        title: {
          text: '$ ' + this.seriesModel.valor[0]
        },
        subtitle: {
          text: 'Valor del Euro hoy en CLP'
        },
        yAxis: {
          title: {
            text: 'Rango de valores Euro en CLP'
          }
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
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '{series.name} vale $<b>{point.y:,.0f}</b><br/>'
        },
        series: [{
          name: 'Euro en CLP',
          type: 'area',
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
    this.services.getIndicatorsEuro().subscribe((data: any) => {

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