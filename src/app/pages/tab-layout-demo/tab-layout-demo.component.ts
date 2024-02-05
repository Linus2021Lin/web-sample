import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-layout-demo',
  templateUrl: './tab-layout-demo.component.html',
  styleUrls: ['./tab-layout-demo.component.scss']
})
export class TabLayoutDemoComponent implements OnInit {
  tabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeTab(event) {
    this.tabIndex = event.index;
  }

}
