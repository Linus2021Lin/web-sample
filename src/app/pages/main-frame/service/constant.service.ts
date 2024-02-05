import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { menuItemObject } from '../../../public-share/interface/common';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor(
    private translateService: TranslateService
  ) { }

  getMenuList():menuItemObject[] {
    return [
      {
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.DASHBOARD'),
        iconName: 'auto_awesome_mosaic',
        routingName: 'dashboard',
        isShow: true
      },
      {
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.FORM_DEMO'),
        iconImagePath: '../../../assets/icons/menu_list_icons/functions.svg',
        routingName: 'formDemo',
        isShow: true
      },
      {
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.MODAL_DEMO'),
        iconImagePath: '../../../assets/icons/menu_list_icons/functions.svg',
        routingName: 'modalDemo',
        isShow: true
      },
      {
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.TABLE_DEMO'),
        iconImagePath: '../../../assets/icons/menu_list_icons/functions.svg',
        routingName: 'tableDemo',
        isShow: true
      },
      {
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.LAYOUT_DEMO'),
        iconImagePath: '../../../assets/icons/menu_list_icons/functions.svg',
        isShow: true,
        subMenu: [
          {
            itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.SPA_LAYOUT_DEMO'),
            routingName: 'spaLayoutDemo',
            isShow: true
          },
          {
            itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.TAB_LAYOUT_DEMO'),
            routingName: 'tabLayoutDemo',
            isShow: true
          }
        ]
      }
    ];
  }
}
