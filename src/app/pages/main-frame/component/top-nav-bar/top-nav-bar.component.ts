import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  cloneDeep as _cloneDeep
} from 'lodash';
import { ToastrOperatorService } from '../../../../public-share/service/toastr-operator.service';
import { TOEKN_SEESION_NAME } from '../../../../public-share/service/global-constant.service';
import { PageHandlerService } from '../../service/page-handler.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  @ViewChild('loginExpireSettingTemplate', { static: true }) loginExpireSettingTemplateRef: TemplateRef<any>;

  unReadCounter = null;
  isInit = false;
  eventItems = [];
  isEventLoading = false;

  constructor(
    private router: Router,
    private pageHandlerService: PageHandlerService,
    private toastrOperatorService: ToastrOperatorService
  ) { }

  ngOnInit(): void {
    this.getEventData();
    this.isInit = true;
  }

  private getEventData() {
    this.isEventLoading = true;

    this.pageHandlerService.getEventData().subscribe(response => {
        this.eventItems = _cloneDeep(response['events']);
        this.unReadCounter = response['unReadCounter'];
        this.isEventLoading = false;
      })
  }

  onOpenEventMenu() {
    this.getEventData();
  }

  onConfirmEventItem(event, $event) {
    $event.stopPropagation();
    $event.preventDefault();

    const confirmEventIndex = this.eventItems.findIndex(data => data.title === event.title);

    if (confirmEventIndex !== -1) {
      this.eventItems[confirmEventIndex]['confirm'] = true;
      this.unReadCounter--;
      this.toastrOperatorService.showSuccessToastr(
        'Event Confirmed Successfully!',
        'Event Confirmed'
      );
    } else {
      this.toastrOperatorService.showErrorToastr(
        'Event Confirmed Fail!',
        'Event Confirmed'
      );
    }
  }

  onClickLogout() {
    // Call ajax that logout with auth server
    localStorage.setItem(TOEKN_SEESION_NAME, '');
    this.router.navigate(['/login']);
  }

}
