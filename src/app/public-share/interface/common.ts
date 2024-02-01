export interface SimpleOptionObject {
  label: string;
  value: any;
}

export interface menuItemObject {
  itemName: string;
  routingName?: string;
  iconName?: string;
  iconImagePath?: string;
  isShow?: boolean;// For dynamic update menu list
  subMenu?: menuItemObject[];
}
