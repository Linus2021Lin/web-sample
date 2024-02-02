import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  cloneDeep as _cloneDeep
} from 'lodash';
import { ToastrOperatorService } from '../../public-share/service/toastr-operator.service';
import { DataToolsService } from '../../public-share/service/data-tools.service';
import {
  DataTableFeatureFlags,
  DataTableColumnConfig
} from '../../public-share/interface/data-table';
import { PageService } from './service/page.service';
import { ConstantService } from './service/constant.service';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {
  @ViewChild('booleanColumn', {static: true}) booleanColumnRef: TemplateRef<any>;

  tableModel: DataTableColumnConfig[];
  tableData: any[];
  tableFlags: DataTableFeatureFlags = {
    isSupportSelectionRow: true,
    isSupportExpandRow: true,
    isActiveRowHoverEvent: true,
    isSupportFooterExportActions: true
  }
  readonly demoTableData$: Observable<any[]> = this.pageService.demoTableData$;
  readonly loading$: Observable<boolean> = this.pageService.loading$;

  constructor(
    private pageService: PageService,
    private constantService: ConstantService,
    private toastrOperatorService: ToastrOperatorService,
    private dataToolsService: DataToolsService
  ) { }

  ngOnInit(): void {
    this.initialTableModel();
    this.initialTableData();
  }

  private initialTableModel(): void {
    const tableColumns = this.constantService.getTableColumns();

    tableColumns.forEach(column=> {

      if (column.dataKey === 'status') {
        column['customizedCellTemplate'] = this.booleanColumnRef;
      }
    });

    this.tableModel = _cloneDeep(tableColumns);
  }

  private initialTableData(): void {
    this.pageService.getDemoTableData();
    this.demoTableData$.subscribe(
      res => {
        this.tableData = res;
      }
    )
  }

  refreshTableData(): void {
    this.pageService.getDemoTableData();
  }

  stringifyRowData(rowData) {
    return JSON.stringify(rowData);
  }

  isRowDisabledSelect = (rowData) => {
    return !rowData['status'];
  }

  batchDelete(event) {
    console.log('batch delete target')
    console.log(event)
    console.log('batch delete target')
    this.toastrOperatorService.showSuccessToastr('Batch Delete Success');
  }

  hoverRow(event) {
    console.log('hover row')
    console.log(event)
    console.log('hover row')
  }

  leaveRow(event) {
    console.log('leave row')
    console.log(event)
    console.log('leave row')
  }

  changeSort(event) {
    console.log('change sort')
    console.log(event)
    console.log('change sort')
    this.toastrOperatorService.showSuccessToastr('Change sort');
  }

  changePaginator(event) {
    console.log('change paginator')
    console.log(event)
    console.log('change paginator')
    this.toastrOperatorService.showSuccessToastr('Change paginator');
  }

  updateTableRecord(rowData) {
    console.log('update target data')
    console.log(rowData)
    console.log('update target data')
    this.toastrOperatorService.showSuccessToastr('Update Success');
  }

  deleteTableRecord(rowData) {
    console.log('delete target data')
    console.log(rowData)
    console.log('delete target data')
    this.toastrOperatorService.showSuccessToastr('Delete Success');
  }

  exportCsvFile():void {
    const fileName = 'Export Demo';

    this.dataToolsService.generateCsvFile(_cloneDeep(this.tableData), fileName);
  }

}
