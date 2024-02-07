import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { MockDataService } from '../../public-share/service/mock-data.service';
import { ChartsToolsService } from '../../public-share/service/charts-tools.service';
import {
  TitleConfig,
  ToolboxConfig
} from '../../public-share/interface/echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  horizontalBarChartInstance;
  verticalBarChartInstance;
  pieChartInstance;
  halfDoughnutChartInstance;
  multiLineChartInstance;
  timeChartInstance;

  constructor(
    private chartsToolsService: ChartsToolsService,
    private mockDataService: MockDataService
  ) { }

  ngOnInit(): void {
    this.initChartInstance();

    this.drawHorizontalBarChart();
    this.drawVerticalBarChart();
    this.drawPieChart();
    this.drawHalfDoughnutChart();
    this.drawMultiLineChart();
    this.drawTimeChart();
  }

  private initChartInstance() {
    let chartDom;

    chartDom = document.getElementById('horizontalBarChart')!;
    this.horizontalBarChartInstance = echarts.init(chartDom);

    chartDom = document.getElementById('verticalBarChart')!;
    this.verticalBarChartInstance = echarts.init(chartDom);

    chartDom = document.getElementById('pieChart')!;
    this.pieChartInstance = echarts.init(chartDom);

    chartDom = document.getElementById('halfDoughnutChart')!;
    this.halfDoughnutChartInstance = echarts.init(chartDom);

    chartDom = document.getElementById('multiLineChart')!;
    this.multiLineChartInstance = echarts.init(chartDom);

    chartDom = document.getElementById('timeChart')!;
    this.timeChartInstance = echarts.init(chartDom);
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

  private drawMultiLineChart() {
    const title: TitleConfig = {
      title: 'Test Line Chart',
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

  private drawTimeChart() {
    const title: TitleConfig = {
      title: 'Test Time Chart'
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

}
