export interface TitleConfig {
  title: string;
  subTitle?: string;
}

export interface ToolboxConfig {
  isShow: boolean;
  orientType?: 'horizontal' | 'vertical'; // Default value is horizontal
  // The default value of all flags is false
  isSupportRestore?: boolean;
  isSupportSaveAsImage?: boolean;
  isSupportDataView?: boolean;
  isSupportDataZoom?: boolean;
}

export interface BasicLineChartSeries {
  resourceName: string;
  sourceData: BasicLineChartSourceData[];
}

export interface BasicLineChartSourceData {
  xAxis: any;
  yAxis: any;
}

export interface BasicBarChartSeries {
  resourceName: string;
  sourceData: BasicBarChartSourceData[];
}

export interface BasicBarChartSourceData {
  categoryName: any;
  value: any;
}

export interface BasicPieChartSourceData {
  name: string;
  value: number;
}
