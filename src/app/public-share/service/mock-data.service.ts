import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

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
}
