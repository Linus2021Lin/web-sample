import { Component, OnInit, AfterViewChecked } from '@angular/core';
import * as echarts from 'echarts';
import { MockDataService } from '../../public-share/service/mock-data.service';
import { ChartsToolsService } from '../../public-share/service/charts-tools.service';
import {
  TitleConfig,
  ToolboxConfig
} from '../../public-share/interface/echarts';

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.scss']
})
export class ChartDemoComponent implements OnInit, AfterViewChecked {
  isChartInit = false;
  tabIndex = 0;

  timeChartInstance;
  singleLineChartInstance;
  multiLineChartInstance;
  singleBarChartInstance;
  horizontalBarChartInstance;
  verticalBarChartInstance;
  pieChartInstance;
  doughnutChartInstance;
  halfDoughnutChartInstance;
  nightingaleChartInstance;

  constructor(
    private chartsToolsService: ChartsToolsService,
    private mockDataService: MockDataService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    // The DOM that inside ng-Material component
    // Will be null when refresh page.
    // Need to wait angular render it.
    const chartDomArray = document.getElementsByClassName('chart-div')!;

    if (!this.isChartInit && (chartDomArray.length > 0) && (this.tabIndex !== 0)) {
      this.initChartInstance();
      this.drawChart();
    }
  }

  private initChartInstance() {
    let chartDom;

    if (this.tabIndex === 1) {
      chartDom = document.getElementById('timeChart')!;
      this.timeChartInstance = echarts.init(chartDom);
    } else if (this.tabIndex === 2) {
      chartDom = document.getElementById('singleLineChart')!;
      this.singleLineChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('multiLineChart')!;
      this.multiLineChartInstance = echarts.init(chartDom);
    } else if (this.tabIndex === 3) {
      chartDom = document.getElementById('singleBarChart')!;
      this.singleBarChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('horizontalBarChart')!;
      this.horizontalBarChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('verticalBarChart')!;
      this.verticalBarChartInstance = echarts.init(chartDom);
    } else if (this.tabIndex === 4) {
      chartDom = document.getElementById('pieChart')!;
      this.pieChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('doughnutChart')!;
      this.doughnutChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('halfDoughnutChart')!;
      this.halfDoughnutChartInstance = echarts.init(chartDom);
      chartDom = document.getElementById('nightingaleChart')!;
      this.nightingaleChartInstance = echarts.init(chartDom);
    }
  }

  private drawChart() {
    if (this.tabIndex === 1) {
      this.drawTimeChart();
    } else if (this.tabIndex === 2) {
      this.drawSingleLineChart();
      this.drawMultiLineChart();
    } else if (this.tabIndex === 3) {
      this.drawSingleBarChart();
      this.drawHorizontalBarChart();
      this.drawVerticalBarChart();
    } else if (this.tabIndex === 4) {
      this.drawPieChart();
      this.drawDoughnutChart();
      this.drawHalfDoughnutChart();
      this.drawNightingaleChart();
    }

    this.isChartInit = true;
  }

  private drawTimeChart() {
    const title: TitleConfig = {
      title: 'Time Chart'
    };
    const chartData = this.mockDataService.getMockTimeChartData();
    const option = this.chartsToolsService.generateTimeChartOptions(
      title,
      true,
      true,
      'Mock Data',
      chartData
    );

    this.timeChartInstance.setOption(option);
  }

  private drawSingleLineChart() {
    const title: TitleConfig = {
      title: 'Line Chart',
      subTitle: 'Single-Line'
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockSingleLineChartData();
    const option = this.chartsToolsService.generateBasicLineChartOptions(
      title,
      true,
      toolboxSetting,
      chartData
    );

    this.singleLineChartInstance.setOption(option);
  }

  private drawMultiLineChart() {
    const title: TitleConfig = {
      title: 'Line Chart',
      subTitle: 'Multi-Line'
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true
    };
    const chartData = this.mockDataService.getMockMultiLineChartData();
    const option = this.chartsToolsService.generateBasicLineChartOptions(
      title,
      true,
      toolboxSetting,
      chartData
    );

    this.multiLineChartInstance.setOption(option);
  }

  private drawSingleBarChart() {
    const title: TitleConfig = {
      title: 'Bar Chart',
      subTitle: 'Single-Bar'
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockSingleBarChartData();
    const option = this.chartsToolsService.generateBasicBarChartOptions(
      'horizontal',
      title,
      true,
      toolboxSetting,
      chartData
    );

    this.singleBarChartInstance.setOption(option);
  }

  private drawHorizontalBarChart() {
    const title: TitleConfig = {
      title: 'Test Bar Chart',
      subTitle: 'Multi-Bar'
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true
    };
    const chartData = this.mockDataService.getMockMultiBarChartData();
    const option = this.chartsToolsService.generateBasicBarChartOptions(
      'horizontal',
      title,
      true,
      toolboxSetting,
      chartData
    );

    this.horizontalBarChartInstance.setOption(option);
  }

  private drawVerticalBarChart() {
    const title: TitleConfig = {
      title: 'Test Bar Chart',
      subTitle: 'Multi-Bar'
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true
    };
    const chartData = this.mockDataService.getMockMultiBarChartData();
    const option = this.chartsToolsService.generateBasicBarChartOptions(
      'vertical',
      title,
      true,
      toolboxSetting,
      chartData
    );

    this.verticalBarChartInstance.setOption(option);
  }

  private drawPieChart() {
    const title: TitleConfig = {
      title: ''
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockPieChartData();
    const option = this.chartsToolsService.generateBasicPieChartOptions(
      'pie',
      title,
      'Mock Data',
      true,
      toolboxSetting,
      chartData
    );

    this.pieChartInstance.setOption(option);
  }

  private drawDoughnutChart() {
    const title: TitleConfig = {
      title: ''
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockPieChartData();
    const option = this.chartsToolsService.generateBasicPieChartOptions(
      'doughnut',
      title,
      'Mock Data',
      true,
      toolboxSetting,
      chartData
    );

    this.doughnutChartInstance.setOption(option);
  }

  private drawHalfDoughnutChart() {
    const title: TitleConfig = {
      title: ''
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockPieChartData();
    const option = this.chartsToolsService.generateBasicPieChartOptions(
      'half doughnut',
      title,
      'Mock Data',
      true,
      toolboxSetting,
      chartData
    );

    this.halfDoughnutChartInstance.setOption(option);
  }

  private drawNightingaleChart() {
    const title: TitleConfig = {
      title: ''
    };
    const toolboxSetting: ToolboxConfig = {
      isShow: true,
      isSupportSaveAsImage: true,
      isSupportDataView: true
    };
    const chartData = this.mockDataService.getMockPieChartData();
    const option = this.chartsToolsService.generateBasicPieChartOptions(
      'nightingale',
      title,
      'Mock Data',
      true,
      toolboxSetting,
      chartData
    );

    this.nightingaleChartInstance.setOption(option);
  }

  onChangeTab(event) {
    this.tabIndex = event.index;
    this.isChartInit = false;
  }
}
