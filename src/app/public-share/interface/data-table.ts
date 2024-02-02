import { TemplateRef } from '@angular/core';

export interface DataTableFeatureFlags {
  // The default value of all flags is false
  isHiddenHeaderActions?: boolean, // table header action buttons
  isHiddenRowActions?: boolean, // table row action buttons
  isHiddenRefresh?: boolean,
  isHiddenBatchDelete?: boolean,
  isHiddenPaginator?: boolean,
  isNoneStickyHeaderRow?: boolean,
  isSupportSelectionRow?: boolean,
  isSupportExpandRow?: boolean,
  isActiveRowHoverEvent?: boolean,
  isSupportFooterExportActions?: boolean
}

export interface DataTableColumnConfig  {
  dataKey: string,
  displayName: string,
  sortType: 'asc' | 'desc' | 'disabled',
  customizedCellTemplate?: TemplateRef<any>, // customized cell template
  customizedStyle?: object, //Ex: {'overflow':'hidden'}
}

export interface RefreshEmitData {
  currentPaginatorInfo: PaginatorEmitData
}

export interface SortEmitData {
  name: string,
  direction: string
}

export interface PaginatorEmitData {
  pageIndex: number,
  pageSize: number
}

export interface MouseHoverRowEmitData {
  rowData: object,
  mouseX: number,
  mouseY: number
}

export interface MouseLeaveRowEmitData {
  rowData: object
}
