import { Injectable } from '@angular/core';
import {
  cloneDeep as _cloneDeep,
  get as _get
} from 'lodash';
import {
  DEFAULT_ECHART_TOOLTIP_TRIGGER,
  DEFAULT_ECHART_TOOLBOX_ORIENT
} from './global-constant.service';
import {
  TitleConfig,
  ToolboxConfig,
  BasicLineChartSeries,
  BasicBarChartSeries,
  BasicPieChartSourceData
} from '../interface/echarts';

@Injectable({
  providedIn: 'root'
})
export class ChartsToolsService {

  constructor() { }

  private generateChartToolBoxFeatureObject(toolboxConfig: ToolboxConfig) {
    const restoreFlag = _get(toolboxConfig, 'isSupportRestore', false);
    const saveAsImageFlag = _get(toolboxConfig, 'isSupportSaveAsImage', false);
    const dataViewFlag = _get(toolboxConfig, 'isSupportDataView', false);
    const dataZoomFlag = _get(toolboxConfig, 'isSupportDataZoom', false);
    const featureObject = {};

    // Enable feature, just need to assign an empty object.
    if (restoreFlag) {
      featureObject['restore'] = {};
    }
    if (saveAsImageFlag) {
      featureObject['saveAsImage'] = {};
    }
    if (dataViewFlag) {
      featureObject['dataView'] = {};
    }
    if (dataZoomFlag) {
      featureObject['dataZoom'] = {};
    }

    return featureObject;
  }

  private generateTimeChartToolBoxFeatureObject(isSupportSaveAsImage: boolean) {
    // For UX of time cahrt
    // Force setting these feature config.
    const featureObject = {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {}
    };

    if (isSupportSaveAsImage === true) {
      featureObject['saveAsImage'] = {};
    }

    return featureObject;
  }

  private formatBasicLineChartSeriesData(seriesArray: BasicLineChartSeries[]) {
    const formatData = [];
    const xAxisCategory = [];

    seriesArray.forEach(series => {
      const resourceName = series.resourceName;
      const yAxisData = [];

      series.sourceData.forEach(data => {
        const xAxisSource = data.xAxis;
        const yAxisSource = data.yAxis;

        if (!xAxisCategory.includes(xAxisSource)) {
          xAxisCategory.push(xAxisSource)
        }

        yAxisData.push(yAxisSource);
      });

      formatData.push({
        name: resourceName,
        type: 'line',
        data: _cloneDeep(yAxisData)
      });
    });

    return [formatData, xAxisCategory];
  }

  private formatBasicBarChartSeriesData(seriesArray: BasicBarChartSeries[]) {
    const formatData = [];
    const axisCategory = [];

    seriesArray.forEach(series => {
      const resourceName = series.resourceName;
      const valueArray = [];

      series.sourceData.forEach(data => {
        const categoryName = data.categoryName;
        const value = data.value;

        if (!axisCategory.includes(categoryName)) {
          axisCategory.push(categoryName)
        }

        valueArray.push(value);
      });

      formatData.push({
        name: resourceName,
        type: 'bar',
        data: _cloneDeep(valueArray)
      });
    });

    return [formatData, axisCategory];
  }

  private generatePieChartSeriesOption(pieType: 'pie' | 'doughnut' | 'half doughnut' | 'nightingale') {
    let optionObject;

    if (pieType === 'pie') {
      optionObject = {
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      };
    } else if (pieType === 'doughnut') {
      optionObject = {
        radius: ['40%', '70%'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
      };
    } else if (pieType === 'half doughnut') {
      optionObject = {
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start angle
        startAngle: 180,
        label: {
          show: true,
          formatter(param) {
            // correct the percentage
            return param.name + ' (' + param.percent! * 2 + '%)';
          }
        }
      };
    } else if (pieType === 'nightingale') {
      optionObject = {
        radius: [50, 250],
        roseType: 'radius'
      };
    }

    return optionObject;
  }

  private formatHalfDoughnutChartSourceData(sourceData: BasicPieChartSourceData[]) {
    const formatData = [];
    let totalValue = 0;

    sourceData.forEach(data => {
      totalValue += data.value;

      formatData.push(data);
    });

    formatData.push({
      // make an record to fill the bottom 50%
      value: totalValue,
      itemStyle: {
        // stop the chart from rendering this piece
        color: 'none',
        decal: {
          symbol: 'none'
        }
      },
      label: {
        show: false
      }
    });

    return formatData;
  }

  generateBasicLineChartOptions(
    titleData: TitleConfig,
    isShowLegend: boolean,
    toolboxConfig: ToolboxConfig,
    seriesArray: BasicLineChartSeries[],
    tooltipTriggerType: 'item' | 'axis' | 'none' = DEFAULT_ECHART_TOOLTIP_TRIGGER
  ) {
    const [formatSeries, xAxisCategory] = this.formatBasicLineChartSeriesData(seriesArray);

    return {
      title: {
        text: titleData.title,
        subtext: titleData.subTitle || ''
      },
      legend: {
        show: isShowLegend
      },
      tooltip: {
        trigger: tooltipTriggerType
      },
      toolbox: {
        show: toolboxConfig.isShow,
        orient: toolboxConfig.orientType || DEFAULT_ECHART_TOOLBOX_ORIENT,
        feature: this.generateChartToolBoxFeatureObject(toolboxConfig)
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisCategory
      },
      yAxis: {
        type: 'value'
      },
      series: formatSeries
    };
  }

  generateTimeChartOptions(
    titleData: TitleConfig,
    isShowLegend: boolean,
    // For UX of time cahrt
    // Only allow user on/off this toolbox feature.
    isSupportSaveAsImage: boolean,
    resourceName: string,
    sourceData: [number,number][]
  ) {
    return {
      title: {
        text: titleData.title,
        subtext: titleData.subTitle || ''
      },
      legend: {
        show: isShowLegend
      },
      // For UX of time cahrt
      // Force setting the tooltip config.
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      toolbox: {
        feature: this.generateTimeChartToolBoxFeatureObject(isSupportSaveAsImage)
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          name: resourceName,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: sourceData
        }
      ]
    };
  }

  generateBasicBarChartOptions(
    barDirection: 'horizontal' | 'vertical',
    titleData: TitleConfig,
    isShowLegend: boolean,
    toolboxConfig: ToolboxConfig,
    seriesArray: BasicBarChartSeries[],
    tooltipTriggerType: 'item' | 'axis' | 'none' = DEFAULT_ECHART_TOOLTIP_TRIGGER
  ) {
    const [formatSeries, axisCategory] = this.formatBasicBarChartSeriesData(seriesArray);
    let xAxisObject, yAxisObject;

    if (barDirection === 'horizontal') {
      xAxisObject = {
        type: 'value'
      }

      yAxisObject = {
        type: 'category',
        data: axisCategory
      }
    } else {
      xAxisObject = {
        type: 'category',
        data: axisCategory
      }

      yAxisObject = {
        type: 'value'
      }
    }

    return {
      title: {
        text: titleData.title,
        subtext: titleData.subTitle || ''
      },
      legend: {
        show: isShowLegend
      },
      tooltip: {
        trigger: tooltipTriggerType
      },
      toolbox: {
        show: toolboxConfig.isShow,
        orient: toolboxConfig.orientType || DEFAULT_ECHART_TOOLBOX_ORIENT,
        feature: this.generateChartToolBoxFeatureObject(toolboxConfig)
      },
      xAxis: xAxisObject,
      yAxis: yAxisObject,
      series: formatSeries
    };
  }

  generateBasicPieChartOptions(
    pieType: 'pie' | 'doughnut' | 'half doughnut' | 'nightingale',
    titleData: TitleConfig,
    resourceName: string,
    isShowLegend: boolean,
    toolboxConfig: ToolboxConfig,
    sourceData: BasicPieChartSourceData[]
  ) {
    const seriesOption = this.generatePieChartSeriesOption(pieType);
    const seriesData = (pieType === 'half doughnut')?
                        this.formatHalfDoughnutChartSourceData(sourceData):
                        _cloneDeep(sourceData);

    return {
      title: {
        text: titleData.title,
        subtext: titleData.subTitle || '',
        // Force setting this config for UX.
        left: 'center'
      },
      legend: {
        show: isShowLegend,
        // Force setting this config for UX.
        orient: 'vertical',
        left: 'left',
        selectedMode: false
      },
      tooltip: {
        // Pie chart only can trigger by item.
        trigger: 'item'
      },
      toolbox: {
        show: toolboxConfig.isShow,
        orient: toolboxConfig.orientType || DEFAULT_ECHART_TOOLBOX_ORIENT,
        feature: this.generateChartToolBoxFeatureObject(toolboxConfig)
      },
      series: [
        {
          name: resourceName,
          type: 'pie',
          data: seriesData,
          ...seriesOption
        }
      ]
    };
  }
}
