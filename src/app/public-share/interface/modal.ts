import { TemplateRef, InjectionToken } from '@angular/core';

export interface ModalCloseObj<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

export interface BasicModalObj {
  title: string;
  content?: string;
  template?: TemplateRef<any>;
  isShowConfirmBtn: boolean;
  isShowCancelBtn: boolean;
  size?: 'small' | 'medium' | 'large';
  data?: any;
}

export interface FormModalObj {
  title: string;
  data?: any;
}

export const MODAL_DATA = new InjectionToken<FormModalObj>('MODAL_DATA');
