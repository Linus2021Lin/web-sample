import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TimeService } from './time.service';
import {
  BasicLineChartSeries,
  BasicLineChartSourceData,
  BasicBarChartSeries,
  BasicBarChartSourceData,
  BasicPieChartSourceData
} from '../interface/echarts';

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

  getMockMultiLineChartData() {
    const xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const resource = ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'];
    const value = [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ];
    const mockData: BasicLineChartSeries[] = [];

    for (let i = 0; i < resource.length; i++) {
      const resourceName = resource[i];
      const sourceData: BasicLineChartSourceData[] = [];

      for (let j = 0; j < xAxis.length; j++) {
        sourceData.push({
          xAxis: xAxis[j],
          yAxis: value[i][j]
        });
      }

      mockData.push({
        resourceName,
        sourceData
      });
    }

    return mockData;
  }

  getMockSingleLineChartData() {
    const xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const resource = ['Email'];
    const value = [150, 230, 224, 218, 135, 147, 260];
    const mockData: BasicLineChartSeries[] = [];

    for (let i = 0; i < resource.length; i++) {
      const resourceName = resource[i];
      const sourceData: BasicLineChartSourceData[] = [];

      for (let j = 0; j < xAxis.length; j++) {
        sourceData.push({
          xAxis: xAxis[j],
          yAxis: value[j]
        });
      }

      mockData.push({
        resourceName,
        sourceData
      });
    }

    return mockData;
  }

  getMockTimeChartData() {
    let baseDay = +new Date();
    const oneDay = 24 * 3600 * 1000;

    const mockData:[number, number][] = [[baseDay, Math.random() * 300]];

    for (let i = 1; i < 20000; i++) {
      let now = new Date((baseDay += oneDay));
      mockData.push([+now, Math.round((Math.random() - 0.5) * 20 + mockData[i - 1][1])]);
    }

    return mockData;
  }

  getMockMultiBarChartData() {
    const category = ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'];
    const resource = ['2011', '2012', '2013'];
    const value = [
      [18203, 23489, 29034, 104970, 131744, 630230],
      [19325, 23438, 31000, 121594, 134141, 681807],
      [15725, 23198, 35180, 222594, 134014, 623107]
    ];
    const mockData: BasicBarChartSeries[] = [];

    for (let i = 0; i < resource.length; i++) {
      const resourceName = resource[i];
      const sourceData: BasicBarChartSourceData[] = [];

      for (let j = 0; j < category.length; j++) {
        sourceData.push({
          categoryName: category[j],
          value: value[i][j]
        });
      }

      mockData.push({
        resourceName,
        sourceData
      });
    }

    return mockData;
  }

  getMockSingleBarChartData() {
    const category = ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'];
    const resource = ['2011'];
    const value = [18203, 23489, 29034, 104970, 131744, 630230];
    const mockData: BasicBarChartSeries[] = [];

    for (let i = 0; i < resource.length; i++) {
      const resourceName = resource[i];
      const sourceData: BasicBarChartSourceData[] = [];

      for (let j = 0; j < category.length; j++) {
        sourceData.push({
          categoryName: category[j],
          value: value[j]
        });
      }

      mockData.push({
        resourceName,
        sourceData
      });
    }

    return mockData;
  }

  getMockPieChartData() {
    const dataName = ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'];
    const data = [1048, 735, 580, 484, 300];
    const mockData: BasicPieChartSourceData[] = [];

    for (let i = 0; i < dataName.length; i++) {
      mockData.push({
        name: dataName[i],
        value: data[i]
      });
    }

    return mockData;
  }
}
