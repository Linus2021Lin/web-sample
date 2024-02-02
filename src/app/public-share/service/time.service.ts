import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { ConfigType, QUnitType } from'dayjs';
import {
  DEFAULT_TIME_DIFF_UNIT,
  DEFAULT_DATE_TIME_FORMAT
} from './global-constant.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getNowTime(formatString?: string) {
    const dateTimeFormat = formatString || DEFAULT_DATE_TIME_FORMAT;

    return dayjs().format(dateTimeFormat);
  }

  getTimeDiff(startTime: ConfigType, endTime: ConfigType, unitString?: QUnitType) {
    const diffUnit = unitString || DEFAULT_TIME_DIFF_UNIT;

    return dayjs(endTime).diff(dayjs(startTime), diffUnit);
  }

  getTimeDiffWithSecondsNumber(startTime: number, endTime: number, unitString?: QUnitType) {
    const diffUnit = unitString || DEFAULT_TIME_DIFF_UNIT;

    return dayjs.unix(endTime).diff(dayjs.unix(startTime), diffUnit);
  }

  formatDateTime(dateSource: ConfigType, formatString?: string) {
    const dateTimeFormat = formatString || DEFAULT_DATE_TIME_FORMAT;

    return dayjs(dateSource).format(dateTimeFormat);
  }

  formatDateTimeWithSecondsNumber(dateSource: number, formatString?: string) {
    const dateTimeFormat = formatString || DEFAULT_DATE_TIME_FORMAT;

    return dayjs.unix(dateSource).format(dateTimeFormat);
  }
}
