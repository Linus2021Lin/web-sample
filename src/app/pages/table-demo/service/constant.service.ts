import { Injectable } from '@angular/core';
import { DataTableColumnConfig } from '../../../public-share/interface/data-table';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  getTableColumns(): DataTableColumnConfig[] {
    return [
      {
        dataKey: 'id',
        displayName: 'ID',
        sortType: 'asc'
      },
      {
        dataKey:'name',
        displayName: 'Name',
        sortType: 'asc'
      },
      {
        dataKey:'ip',
        displayName: 'IP',
        sortType: 'asc',
        customizedStyle: { minWidth: '120px' }
      },
      {
        dataKey: 'status',
        displayName: 'Status',
        sortType: 'asc',
        customizedStyle: { maxWidth: '90px' }
      },
      {
        dataKey: 'createTime',
        displayName: 'Create Time',
        sortType: 'asc',
        customizedStyle: { minWidth: '120px' }
      }
    ];
  }
}
