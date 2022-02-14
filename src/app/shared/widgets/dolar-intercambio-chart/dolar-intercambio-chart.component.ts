import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { SeriesModel } from 'src/app/Interfaces/SeriesInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';

@Component({
  selector: 'app-dolar-intercambio-chart',
  templateUrl: './dolar-intercambio-chart.component.html',
  styleUrls: ['./dolar-intercambio-chart.component.scss']
})
export class DolarIntercambioChartComponent implements OnInit {

  indicatorDolarIntercambioModel: IndicatorModel = {
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

    this.services.getIndicatorsDolarIntercambio().subscribe((res: any) => {

      //mapeo del observable
      this.seriesModel = {
        fecha: res['serie'].map((f: any) => f.fecha),
        valor: res['serie'].map((f: any) => f.valor)
      }

      const difValue = Number(this.seriesModel.valor[0]) - Number(this.seriesModel.valor[1]);
      const difValueFormat = difValue.toString().substr(0, 4);
      console.log(difValueFormat);

      this.indicatorDolarIntercambioModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      console.log(this.indicatorDolarIntercambioModel);

      //INICIO DEL CHART
      Highcharts.chart({
        chart: {
          styledMode: true,
          renderTo: 'containerDolarIntercambio',
          type: 'areaspline'
        },
        title: {
          text: '$' + this.indicatorDolarIntercambioModel.serie[0].valor
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
            this.indicatorDolarIntercambioModel.serie[0].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[1].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[2].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[3].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[4].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[5].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[6].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[7].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[8].fecha.substr(0,10),
            this.indicatorDolarIntercambioModel.serie[9].fecha.substr(0,10)
          ],
          plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
          }]
        },
        yAxis: {
          title: {
            text: 'Rango de valores en CLP del USD_Intercambio'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: ' CLP'
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
          name: 'Dolar_Intercambio',
          type: 'areaspline',
          data: [
            this.indicatorDolarIntercambioModel.serie[0].valor,
            this.indicatorDolarIntercambioModel.serie[1].valor,
            this.indicatorDolarIntercambioModel.serie[2].valor,
            this.indicatorDolarIntercambioModel.serie[3].valor,
            this.indicatorDolarIntercambioModel.serie[4].valor,
            this.indicatorDolarIntercambioModel.serie[5].valor,
            this.indicatorDolarIntercambioModel.serie[6].valor,
            this.indicatorDolarIntercambioModel.serie[7].valor,
            this.indicatorDolarIntercambioModel.serie[8].valor,
            this.indicatorDolarIntercambioModel.serie[9].valor

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
    this.services.getIndicatorsDolarIntercambio().subscribe((data: any) => {

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