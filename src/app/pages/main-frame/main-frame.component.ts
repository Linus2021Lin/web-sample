import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MainFrameOperatorService } from '../../public-share/service/main-frame-operator.service';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainFrameComponent implements OnInit, AfterViewInit {
  @ViewChild('appDrawer') appDrawerRef: ElementRef;

  constructor(
    private mainFrameOperatorService: MainFrameOperatorService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mainFrameOperatorService.appDrawerRef = this.appDrawerRef;
  }

}
