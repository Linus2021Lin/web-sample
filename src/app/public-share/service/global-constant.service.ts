import { InjectionToken } from '@angular/core';
import { PopUpModalConfig } from '../interface/pop-up-modal';

export const TOEKN_SEESION_NAME='sample_site_token'
export const MODAL_DATA_INJECTION_TOKEN = new InjectionToken<PopUpModalConfig>('MODAL_DATA')
export const MODAL_PARENT_FORM_KEY = 'parentForm'
export const MODAL_CHILD_FORM_KEY = 'childForm'
export const DEFAULT_DATE_TIME_FORMAT='YYYY MM-DDTHH:mm:ss SSS [Z] A'
export const DEFAULT_TIME_DIFF_UNIT='day'
