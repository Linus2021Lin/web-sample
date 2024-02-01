import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface ModalCloseEventConfig<R> {
  triggerCloseType: 'backdropClick' | 'close' | 'confirmClose' | 'submitClose';
  data: R;
}

export abstract class SubmitModal {
  abstract submit(): Observable<any>;
}

export interface PopUpModalConfig {
  title: string;
  modalType: 'submit' | 'confirm';
  subTitle?: string;
  cancelBtnLabel?: string;
  submitBtnLabel?: string;
  confirmBtnLabel?: string;
  data?: any;
  parentForm?: FormGroup;
}
