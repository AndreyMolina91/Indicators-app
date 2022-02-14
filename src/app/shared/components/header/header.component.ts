import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //evento a emitir para el toggle sidebar
  @Output() toggleSidebarParameter: EventEmitter<any> = new EventEmitter();

  toggleSidebar() {
    this.toggleSidebarParameter.emit();
  }

  toggleIsActive() {
    let hamburger = document.querySelector(".hamburger");
    hamburger?.classList.toggle("is-active");

  }

}
