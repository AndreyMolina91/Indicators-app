//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

//Material Modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UfChartComponent } from './widgets/uf-chart/uf-chart.component';
import { RecordTableComponent } from './widgets/record-table/record-table.component';
import { DolarChartComponent } from './widgets/dolar-chart/dolar-chart.component';
import { EuroChartComponent } from './widgets/euro-chart/euro-chart.component';
import { UtmChartComponent } from './widgets/utm-chart/utm-chart.component';
import { BitcoinChartComponent } from './widgets/bitcoin-chart/bitcoin-chart.component';
import { IpcChartComponent } from './widgets/ipc-chart/ipc-chart.component';
import { IvpChartComponent } from './widgets/ivp-chart/ivp-chart.component';
import { TpmChartComponent } from './widgets/tpm-chart/tpm-chart.component';
import { DolarIntercambioChartComponent } from './widgets/dolar-intercambio-chart/dolar-intercambio-chart.component';
import { ImacecChartComponent } from './widgets/imacec-chart/imacec-chart.component';
import { LibraCobreChartComponent } from './widgets/libra-cobre-chart/libra-cobre-chart.component';
import { TasaDesempleoChartComponent } from './widgets/tasa-desempleo-chart/tasa-desempleo-chart.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    UfChartComponent,
    RecordTableComponent,
    DolarChartComponent,
    EuroChartComponent,
    UtmChartComponent,
    BitcoinChartComponent,
    IpcChartComponent,
    IvpChartComponent,
    TpmChartComponent,
    DolarIntercambioChartComponent,
    ImacecChartComponent,
    LibraCobreChartComponent,
    TasaDesempleoChartComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    HighchartsChartModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RecordTableComponent
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    UfChartComponent,
    DolarChartComponent,
    RecordTableComponent,
    DolarChartComponent,
    EuroChartComponent,
    UtmChartComponent,
    BitcoinChartComponent,
    IpcChartComponent,
    IvpChartComponent,
    TpmChartComponent,
    DolarIntercambioChartComponent,
    ImacecChartComponent,
    LibraCobreChartComponent,
    TasaDesempleoChartComponent
  ]
})
export class SharedModule { }
