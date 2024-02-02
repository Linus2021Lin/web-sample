import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  cloneDeep as _cloneDeep
} from 'lodash';
import { MockDataService } from '../../../public-share/service/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PageService implements OnDestroy {

  constructor(
    private mockDataService: MockDataService
  ) { }

  private _demoTableData = new BehaviorSubject<any[]>([]);
  private _loading = new BehaviorSubject<boolean>(true);
  readonly demoTableData$: Observable<any[]> = this._demoTableData.asObservable();
  readonly loading$: Observable<boolean> = this._loading.asObservable();

  ngOnDestroy(): void {
    this._demoTableData.unsubscribe();
    this._loading.unsubscribe();
  }

  getDemoTableData(): void {
    this._loading.next(true);
    this.mockDataService.getMockTableData().subscribe(response => {
        this._demoTableData.next(_cloneDeep(response));
        this._loading.next(false);
    });
  }
}
