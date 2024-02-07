import { InjectionToken } from '@angular/core';
import { PopUpModalConfig } from '../interface/pop-up-modal';

export const TOEKN_SEESION_NAME='sample_site_token'
export const MODAL_DATA_INJECTION_TOKEN = new InjectionToken<PopUpModalConfig>('MODAL_DATA')
export const MODAL_PARENT_FORM_KEY = 'parentForm'
export const MODAL_CHILD_FORM_KEY = 'childForm'
export const DEFAULT_DATE_TIME_FORMAT='YYYY MM-DDTHH:mm:ss SSS [Z] A'
export const DEFAULT_TIME_DIFF_UNIT='day'
export const I18N_SEESION_NAME='sample_i18n_lan'
export const DEFAULT_I18N_LANGUAGE='tc'
export const DEFAULT_ECHART_TOOLTIP_TRIGGER='axis'
export const DEFAULT_ECHART_TOOLBOX_ORIENT='horizontal'
