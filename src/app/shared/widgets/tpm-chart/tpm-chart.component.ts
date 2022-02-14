import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { IndicatorModel } from 'src/app/Interfaces/IndicatorInterface';
import { SeriesModel } from 'src/app/Interfaces/SeriesInterface';
import { IndicatorValuesService } from 'src/app/services/indicator-values.service';
import { RecordTableComponent } from '../record-table/record-table.component';

@Component({
  selector: 'app-tpm-chart',
  templateUrl: './tpm-chart.component.html',
  styleUrls: ['./tpm-chart.component.scss']
})
export class TpmChartComponent implements OnInit {

  indicatorTpmModel: IndicatorModel = {
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

    this.services.getIndicatorsTpm().subscribe((res: any) => {

      //mapeo del observable
      this.seriesModel = {
        fecha: res['serie'].map((f: any) => f.fecha),
        valor: res['serie'].map((f: any) => f.valor)
      }

      const difValue = Number(this.seriesModel.valor[0]) - Number(this.seriesModel.valor[1]);
      const difValueFormat = difValue.toString().substr(0, 4);
      console.log(difValueFormat);

      this.indicatorTpmModel = {
        version: res.version,
        autor: res.autor,
        codigo: res.codigo,
        nombre: res.nombre,
        unidad_medida: res.unidad_medida,
        serie: res.serie
      }

      console.log(this.indicatorTpmModel);

      //INICIO DEL CHART
      Highcharts.chart({
        chart: {
          styledMode: true,
          renderTo: 'containerTpm',
          plotShadow: false,
          type: 'pie'
        },
        credits:{
          enabled: false
        },
        title: {
          text: '% ' + this.seriesModel.valor[0]
        },
        tooltip: {
          pointFormat: '{series}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'TPM',
          colorByPoint: true,
          type: 'pie',
          data: [{
            name: this.seriesModel.fecha[0].substr(0, 10),
            y: Number(this.seriesModel.valor[0]) ,
          }, {
            name: this.seriesModel.fecha[1].substr(0, 10),
            y: Number(this.seriesModel.valor[1]) 
          }, {
            name: this.seriesModel.fecha[2].substr(0, 10),
            y: Number(this.seriesModel.valor[2]) 
          }, {
            name: this.seriesModel.fecha[3].substr(0, 10),
            y: Number(this.seriesModel.valor[3]) 
          }, {
            name: this.seriesModel.fecha[4].substr(0, 10),
            y: Number(this.seriesModel.valor[4]) 
          }, {
            name: this.seriesModel.fecha[5].substr(0, 10),
            y: Number(this.seriesModel.valor[5]) 
          }, {
            name: this.seriesModel.fecha[6].substr(0, 10),
            y: Number(this.seriesModel.valor[6]) 
          }, {
            name: this.seriesModel.fecha[7].substr(0, 10),
            y: Number(this.seriesModel.valor[7]) 
          }, {
            name: this.seriesModel.fecha[8].substr(0, 10),
            y: Number(this.seriesModel.valor[8]) 
          }, {
            name: this.seriesModel.fecha[9].substr(0, 10),
            y: Number(this.seriesModel.valor[9]) 
          }]
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
    this.services.getIndicatorsTpm().subscribe((data: any) => {

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
