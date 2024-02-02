import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(
    private timeService: TimeService
  ) { }

  getMockEvents() {
    const mockData = {
      events: [
        {
          title: 'Event01',
          timestamp: 'Tue, 18 Oct 2022 03:07:01 GMT',
          confirm: true
        },{
          title: 'Event02',
          timestamp: 'Tue, 15 Oct 2022 03:07:01 GMT',
          confirm: false
        },{
          title: 'Event03',
          timestamp: 'Tue, 18 Oct 2022 13:07:01 GMT',
          confirm: false
        },{
          title: 'Event04',
          timestamp: 'Tue, 16 Oct 2022 03:17:01 GMT',
          confirm: true
        }
      ],
      unReadCounter: 2
    };

    return of(mockData);
  }

  getMockTableData() {
    const mockData = [];

    for (let i = 1; i < 50; i++) {
      const loopData =
        {
          id: i,
          name: `Test Record${i}`,
          ip: `10.5.5.${i}`,
          status: i%2===0,
          createTime: this.timeService.getNowTime()
      }

      mockData.push(loopData);
    }

    return of(mockData);
  }
}
