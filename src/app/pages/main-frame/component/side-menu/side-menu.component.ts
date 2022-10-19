import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  cloneDeep as _cloneDeep
} from 'lodash';
import { menuItemObject } from '../../../../public-share/interface/common';
import { MainFrameOperatorService } from '../../../../public-share/service/main-frame-operator.service';
import { ConstantService } from '../../service/constant.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  @HostBinding('attr.aria-expanded') ariaExpanded;
  menuItems: menuItemObject[] = [];
  isExpanded = false;
  selectedItem;

  constructor(
    private constantService: ConstantService,
    private mainFrameOperatorService: MainFrameOperatorService,
    private router: Router
  ) {
    this.ariaExpanded = this.isExpanded;
    this.menuItems = _cloneDeep(this.constantService.getMenuList());
  }

  ngOnInit(): void {
    this.mainFrameOperatorService.currentUrl.subscribe(url => {
      if (this.selectedItem && this.selectedItem.routingName && url) {
        const selectedRoute = this.selectedItem.routingName;

        this.isExpanded = url.indexOf(`/${selectedRoute}`) === 0;
        this.ariaExpanded = this.isExpanded;
      }
    });
  }

  isItemActive(routingName) {
    return routingName? this.router.isActive(routingName, true): false;
  }

  onClickMenuItem(menuItem) {
    this.selectedItem = _cloneDeep(menuItem);

    if (!menuItem.subMenu || !menuItem.subMenu.length) {
      this.router.navigate([menuItem.routingName]);
    }else if (menuItem.subMenu && menuItem.subMenu.length) {
      this.isExpanded = !this.isExpanded;
    }
  }
}
