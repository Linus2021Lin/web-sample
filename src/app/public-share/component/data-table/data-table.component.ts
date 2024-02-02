import {
  Component, OnInit, OnChanges, SimpleChange,
  EventEmitter, Input, Output,
  ViewChild, ElementRef, TemplateRef
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import {
  cloneDeep as _cloneDeep,
  get as _get
} from 'lodash';
import { Observable } from 'rxjs';
import {
  DataTableFeatureFlags,
  DataTableColumnConfig,
  RefreshEmitData,
  SortEmitData,
  PaginatorEmitData,
  MouseHoverRowEmitData,
  MouseLeaveRowEmitData
} from '../../interface/data-table';
import { TableAnimations } from './service/table-animations.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    TableAnimations.expendSwitch,
    TableAnimations.detailContent,
    TableAnimations.actionExpand
  ]
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() featureFlags: DataTableFeatureFlags;
  @Input('dataSource') dataSource$: Observable<any> | any[];
  @Input('isLoading') isLoading$: Observable<boolean>;
  @Input() columns: DataTableColumnConfig[] = [];
  @Input() isCheckboxDisabled: Function;
  @Input() expandRowTemplate: TemplateRef<any>;
  @Input() headerActionsTemplate: TemplateRef<any>;
  @Input() rowActionsTemplate: TemplateRef<any>;
  @Input() footerExportActionsTemplate: TemplateRef<any>;
  @Output() batchDeleteEmmiter = new EventEmitter<any>();
  @Output() refreshEmmiter = new EventEmitter<RefreshEmitData>();
  @Output() hoverRowEmmiter = new EventEmitter<MouseHoverRowEmitData>();
  @Output() leaveRowEmmiter = new EventEmitter<MouseLeaveRowEmitData>();
  @Output() changeSortEmmiter = new EventEmitter<SortEmitData>();
  @Output() changePaginatorEmmiter = new EventEmitter<PaginatorEmitData>();

  @ViewChild('matTableRef', {static: true}) matTableRef: ElementRef;
  @ViewChild(MatSort, {static: true}) matSortRef: MatSort;
  @ViewChild(MatPaginator, {static: true}) matPaginatorRef: MatPaginator;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);

  isHiddenHeaderActions = false;
  isHiddenRowActions = false;
  isHiddenRefresh = false;
  isHiddenBatchDelete = false;
  isHiddenPaginator = false;
  isNoneStickyHeaderRow = false;
  isSupportSelectionRow = false;
  isSupportExpandRow = false;
  isActiveRowHoverEvent = false;
  isSupportFooterExportActions = false;

  sortEmitData: SortEmitData = {
    name: '',
    direction: ''
  };

  paginatorEmitData: PaginatorEmitData = {
    pageIndex: 0,
    pageSize: 10
  };

  expandedRow = null;
  isLoading: boolean = false;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    const perPageLabel = this.translateService.instant('COMPONENT.DATA_TABLE.PAGINATOR.ITEMS_PER_PAGE_LABEL');

    this.initTableFeature();
    this.initTableDisplayColumns();

    this.dataSource.sort = this.matSortRef;
    this.dataSource.paginator = this.matPaginatorRef;

    if (this.dataSource$ instanceof Array) {
      this.dataSource.data = _cloneDeep(this.dataSource$);
    } else if (this.dataSource$) {
       this.dataSource$.subscribe(sourceData => {
        this.dataSource.data = _cloneDeep(sourceData);
      });
    } else {
      // can't get correct source data.
      return;
    }

    if (this.isLoading$) {
      this.isLoading$.subscribe(loadingFlag => {
        this.isLoading = loadingFlag;
      });
    }

    this.matPaginatorRef._intl.itemsPerPageLabel = perPageLabel;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // Monitor source data when it's array type.
    if (changes.dataSource$ && this.dataSource$ instanceof Array) {
      this.dataSource.data = _cloneDeep(changes.dataSource$.currentValue) || [];
    }

    if (changes.featureFlags) {
      const changeFlags = _cloneDeep(changes.featureFlags);

      this.isSupportExpandRow = changeFlags.currentValue && changeFlags.currentValue.isSupportExpandRow || false;
      this.initTableDisplayColumns();
    }

    // Monitor column for this use case:
    // Page may update customized cell template after view init.
    if (changes.columns && changes.columns.currentValue) {
      this.initTableDisplayColumns();
    }
  }

  private initTableFeature() {
    this.isHiddenHeaderActions = _get(this.featureFlags, 'isHiddenHeaderActions', false);
    this.isHiddenRowActions = _get(this.featureFlags, 'isHiddenRowActions', false);
    this.isHiddenRefresh = _get(this.featureFlags, 'isHiddenRefresh', false);
    this.isHiddenBatchDelete = _get(this.featureFlags, 'isHiddenBatchDelete', false);
    this.isHiddenPaginator = _get(this.featureFlags, 'isHiddenPaginator', false);
    this.isNoneStickyHeaderRow = _get(this.featureFlags, 'isNoneStickyHeaderRow', false);
    this.isSupportSelectionRow = _get(this.featureFlags, 'isSupportSelectionRow', false);
    this.isSupportExpandRow = _get(this.featureFlags, 'isSupportExpandRow', false);
    this.isActiveRowHoverEvent = _get(this.featureFlags, 'isActiveRowHoverEvent', false);
    this.isSupportFooterExportActions = _get(this.featureFlags, 'isSupportFooterExportActions', false);
  }

  private initTableDisplayColumns() {
    this.displayedColumns = [];

    this.columns.forEach(column => {
      this.displayedColumns.push(_get(column, 'dataKey'));
    })

    // Add column of feature that user wants to support.
    if (this.isSupportSelectionRow) {
      this.displayedColumns.unshift('checkBoxColumn');
    }
    if (!this.isHiddenRowActions) {
      this.displayedColumns.push('rowActionMenuColumn');
    }
    if (this.isSupportExpandRow) {
      this.displayedColumns.push('expandIconColumn');
    }
  }

  getPaginatorEmitData() {
    return this.paginatorEmitData;
  }

  updateColumnTemplateRef(columnId: string, newTemplateRef: TemplateRef<any>) {
    this.columns.forEach(column => {
      if(column.dataKey === columnId){
        column.customizedCellTemplate = newTemplateRef;
      }
    })
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const selectedNumber = this.selection.selected.length;
    let totalSelectedRowNumber = 0;

    this.dataSource.data.forEach(row => {
      if (!this.isDisabledCheckbox(row)) {
        totalSelectedRowNumber++;
      }
    });

    return selectedNumber === totalSelectedRowNumber;
  }

  // Generate the label for the checkbox on the passed row
  generateCheckboxAriaLabel(rowData?): string {
    if (!rowData) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(rowData) ? 'deselect' : 'select'} row ${rowData.position + 1}`;
  }

  isDisabledCheckbox(rowData): boolean {
    if (this.isCheckboxDisabled) {
      return this.isCheckboxDisabled(rowData);
    }

    return false;
  }

  onClickTableRefresh() {
    this.selection.clear();

    this.refreshEmmiter.emit({
      currentPaginatorInfo: this.paginatorEmitData
    });
  }

  onClickTableBatchDelete() {
    if (!this.selection.hasValue()) return;

    this.batchDeleteEmmiter.emit(this.selection.selected);
    this.selection.clear();
  }

  onChangeDataSort(sort: Sort) {
    this.sortEmitData = {
      name: _get(sort, 'active', ''),
      direction: _get(sort, 'direction', '')
    }

    this.changeSortEmmiter.emit(this.sortEmitData);
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  onChangeTopestCheckbox() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          if (!this.isDisabledCheckbox(row)) {
            this.selection.select(row)
          }
        });
  }

  onClickRowActionMenuIcon(event) {
    // To avoid triggering expand row.
    event.stopPropagation();
  }

  onClickTableRow(rowElement) {
    if (!this.isSupportExpandRow) return;

    this.expandedRow = this.expandedRow === rowElement ? null : rowElement;
  }

  onMouseOverTableRow(event, rowElement) {
    if (!this.isActiveRowHoverEvent) return;

    this.hoverRowEmmiter.emit({
      rowData: rowElement,
      mouseX: event.clientX,
      mouseY: event.clientY
    });
  }

  onMouseLeaveTableRow(rowElement) {
    if (!this.isActiveRowHoverEvent) return;

    this.leaveRowEmmiter.emit({
      rowData: rowElement
    });
  }

  onChangePage(event) {
    this.paginatorEmitData['pageIndex'] = event.pageIndex;
    this.paginatorEmitData['pageSize'] = event.pageSize;

    this.changePaginatorEmmiter.emit(this.paginatorEmitData);
  }

}
