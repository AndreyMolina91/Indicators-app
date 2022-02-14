import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent{

  //estado del sidebar mediante evento emitido desde el headerComponent
  sidebarActive = false;
  
  sidebarToggler(){
    this.sidebarActive = !this.sidebarActive;
  }
}
