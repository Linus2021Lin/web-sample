export interface SimpleOptionObject {
  label: string;
  value: any;
}

export interface menuItemObject {
  itemName: string;
  menuLevel: number;// For indent with submenu or not. It should be start with 0.
  routingName?: string;
  iconName?: string;
  iconImagePath?: string;
  isShow?: boolean;// For dynamic update menu list
  subMenu?: menuItemObject[];
}
