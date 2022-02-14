import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicatorModel } from '../Interfaces/IndicatorInterface';

@Injectable({
  providedIn: 'root'
})
export class IndicatorValuesService {

  baseUrl: string = 'https://mindicador.cl/api';

  constructor(private _http: HttpClient) { }

  getAllIndicators() {
    return this._http.get(this.baseUrl);
  }

  //UF
  getIndicatorsUf() {
    return this._http.get(this.baseUrl+'/uf');
  }

  //Dolar
  getIndicatorsDolar() {
    return this._http.get(this.baseUrl+'/dolar');
  }

  //Indicators with Observables

  //Ivp
  getIndicatorsIvp(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/ivp');
  }

  //Euro
  getIndicatorsEuro(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/euro');
  }

  //dolar_intercambio
  getIndicatorsDolarIntercambio(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/dolar_intercambio');
  }

  //Ipc
  getIndicatorsIpc(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/ipc');
  }

  //Utm
  getIndicatorsUtm(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/utm');
  }

  //Tpm
  getIndicatorsTpm(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/tpm');
  }

  //Bitcoin
  getIndicatorsBitcoin(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/bitcoin');
  }

  //Imacec
  getIndicatorsImacec(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/imacec');
  }

  //libra cobre
  getIndicatorsLibraCobre(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/libra_cobre');
  }

  //tasa desempleo
  getIndicatorsTasaDesempleo(): Observable<IndicatorModel[]> {
    return this._http.get<IndicatorModel[]>(this.baseUrl+'/tasa_desempleo');
  }

}
