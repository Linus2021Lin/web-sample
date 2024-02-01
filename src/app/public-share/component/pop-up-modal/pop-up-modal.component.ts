import {
  Component, Inject, ViewEncapsulation,
  OnDestroy, ComponentRef
} from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  MODAL_DATA_INJECTION_TOKEN,
  MODAL_CHILD_FORM_KEY
} from '../../service/global-constant.service';
import { ModalEventsService } from './service/modal-events.service';
import { SubmitModal, PopUpModalConfig } from '../../interface/pop-up-modal';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopUpModalComponent implements OnDestroy {
  modalOutlet: Portal<any>;
  parentForm = new FormGroup({});
  isLoading: boolean = false;

  title: string;
  modalType: 'submit' | 'confirm';
  subTitle: string;
  cancelBtnLabel: string;
  submitBtnLabel: string;
  confirmBtnLabel: string;

  private componentRef: ComponentRef<SubmitModal>;

  constructor(
    @Inject(MODAL_DATA_INJECTION_TOKEN) public injectConfig: PopUpModalConfig,
    private modalEventsService: ModalEventsService,
    private translateService: TranslateService
  ) {
    this.initModalSetting();
  }

  ngOnDestroy(): void {
    this.modalEventsService.close({
      triggerCloseType: 'close',
      data: null
    });
    this.parentForm = null;
  }

  private initModalSetting() {
    const defaultCancelBtnLabel = this.translateService.instant('COMPONENT.MODAL.ACTION.CANCEL');
    const defaultSubmitBtnLabel = this.translateService.instant('COMPONENT.MODAL.ACTION.SUBMIT');
    const defaultConfirmBtnLabel = this.translateService.instant('COMMON.TEXT.CONFIRM');

    this.title = this.injectConfig.title;
    this.modalType = this.injectConfig.modalType;
    this.subTitle = this.injectConfig.subTitle || '';
    this.cancelBtnLabel = this.injectConfig.cancelBtnLabel || defaultCancelBtnLabel;
    this.submitBtnLabel = this.injectConfig.submitBtnLabel || defaultSubmitBtnLabel;
    this.confirmBtnLabel = this.injectConfig.confirmBtnLabel || defaultConfirmBtnLabel;
  }

  private validAllForm(formGroupSource: FormGroup | FormArray) {
    for (let index in formGroupSource.controls) {
      const absControl = formGroupSource.controls[index];

      if (absControl instanceof FormControl) {
        const control: FormControl = formGroupSource.controls[index];

        control.markAsTouched();
        control.updateValueAndValidity();
      } else if (absControl instanceof FormGroup) {
        let group: FormGroup = formGroupSource.controls[index];

        this.validAllForm(group);
      } else if (absControl instanceof FormArray) {
        let formArray: FormArray = formGroupSource.controls[index];

        this.validAllForm(formArray);
      }
    }
  }

  onContentTemplateAttached(event) {
    this.componentRef = event;
  }

  onClickClose() {
    this.modalEventsService.close({
      triggerCloseType: 'close',
      data: null
    });
  }

  onClickSubmit(): void {
    if (this.parentForm.status !== 'VALID') {
      this.validAllForm(<FormGroup>this.parentForm.get(MODAL_CHILD_FORM_KEY));
      return;
    }

    if (this.componentRef && this.componentRef.instance && this.componentRef.instance.submit) {
      this.isLoading = true;
      this.componentRef.instance.submit().subscribe(
        (res) => {
          this.isLoading = false;
          this.modalEventsService.close({
            triggerCloseType: 'submitClose',
            data: res
          });
        },
        (err) => {
          this.isLoading = false;
          this.modalEventsService.error(err);
        }
      )
    } else {
      this.modalEventsService.error(this.translateService.instant('COMPONENT.MODAL.MSG.NO_SUBMIT_FUNCTION'));
    }
  }

  onClickConfirm() {
    this.modalEventsService.close({
      triggerCloseType: 'confirmClose',
      data: null
    });
  }

}
