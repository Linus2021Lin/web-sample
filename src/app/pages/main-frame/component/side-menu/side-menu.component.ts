import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  cloneDeep as _cloneDeep
} from 'lodash';
import { menuItemObject } from '../../../../public-share/interface/common';
import { MainFrameOperatorService } from '../../../../public-share/service/main-frame-operator.service';
import { ConstantService } from '../../service/constant.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  menuItems: menuItemObject[] = [];
  isExpanded = false;
  selectedItem;
  selectedItemIndex = -1;

  constructor(
    private constantService: ConstantService,
    private mainFrameOperatorService: MainFrameOperatorService,
    private router: Router
  ) {
    this.menuItems = _cloneDeep(this.constantService.getMenuList());
  }

  ngOnInit(): void {
    this.mainFrameOperatorService.currentUrl.subscribe(url => {
      if (this.selectedItem && this.selectedItem.routingName && url) {
        const selectedRoute = this.selectedItem.routingName;

        this.isExpanded = url.indexOf(`/${selectedRoute}`) === 0;
      }
    });
  }

  isItemActive(routingName) {
    return routingName? this.router.isActive(routingName, true): false;
  }

  onClickMenuItem(menuItem, menuIndex?) {
    this.selectedItem = _cloneDeep(menuItem);

    if (menuItem.subMenu && menuItem.subMenu.length) {
      // For use case:
      // Click a sub menu item when web page is another sub menu page.
      if (menuIndex !== this.selectedItemIndex) {
        this.isExpanded = true;
      } else {
        this.isExpanded = !this.isExpanded;
      }
    } else {
      this.router.navigate([menuItem.routingName]);
    }

    if (menuIndex !== undefined) {
      this.selectedItemIndex = menuIndex;
    }
  }
}
