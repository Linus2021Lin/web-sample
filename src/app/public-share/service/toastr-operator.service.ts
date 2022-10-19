import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

@Injectable({
  providedIn: 'root'
})
export class ToastrOperatorService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showSuccessToastr(message?: string, title?: string, toastrConfig?: Partial<IndividualConfig>) {
    if (toastrConfig === undefined) {
      toastrConfig = {
        closeButton: true,
        easeTime: 500,
        extendedTimeOut: 500,
        timeOut: 1500,
        tapToDismiss: true
      };
    }

    return this.toastrService.success(message, title, toastrConfig);
  }

  showWarningToastr(message?: string, title?: string, toastrConfig?: Partial<IndividualConfig>): any {
    if (toastrConfig === undefined) {
      toastrConfig = {
        closeButton: true,
        easeTime: 500,
        extendedTimeOut: 500,
        timeOut: 4000,
        tapToDismiss: true
      };
    }

    return this.toastrService.warning(message, title, toastrConfig);
  }

  showErrorToastr(message?: string, title?: string, toastrConfig?: Partial<IndividualConfig>): any {
    if (toastrConfig === undefined) {
      toastrConfig = {
        closeButton: true,
        easeTime: 500,
        extendedTimeOut: 500,
        timeOut: 4000,
        tapToDismiss: true
      };
    }

    return this.toastrService.error(message, title, toastrConfig);
  }

  clearToastr(){
    this.toastrService.clear();
  }
}
