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
        itemName: this.translateService.instant('PAGE.MAIN_FRAME.MENU.HOME'),
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
        itemName: 'Sub Menu Demo',
        iconImagePath: '../../../assets/icons/menu_list_icons/functions.svg',
        isShow: true,
        subMenu: [
          {
            itemName: 'Sub 01',
            routingName: 'sub_1',
            isShow: true
          },
          {
            itemName: 'Sub 02',
            routingName: 'sub_2',
            isShow: true
          }
        ]
      }
    ];
  }
}
