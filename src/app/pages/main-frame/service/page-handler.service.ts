import { Injectable } from '@angular/core';
import { MockDataService } from '../../../public-share/service/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PageHandlerService {

  constructor(
    private mockDataService: MockDataService
  ) { }

  getEventData() {
    return this.mockDataService.getMockEvents();
  }
}
