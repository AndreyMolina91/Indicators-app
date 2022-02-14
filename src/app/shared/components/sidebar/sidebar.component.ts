import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  fillerNav=[
    {name:"Dashboard",route:"dashboard",icon:"stacked_bar_chart"},
    {name:"posts",route:"posts",icon:"settings"}
  ]
}