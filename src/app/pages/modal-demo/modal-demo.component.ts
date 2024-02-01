import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PopUpModalOperatorService } from '../../public-share/service/pop-up-modal-operator.service';
import { ToastrOperatorService } from '../../public-share/service/toastr-operator.service';
import { PopUpModalConfig } from '../../public-share/interface/pop-up-modal';
import { DemoFormComponent } from '../../form-components/demo-form/demo-form.component';
import { DemoComponentComponent } from './component/demo-component/demo-component.component';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent implements OnInit {
  @ViewChild('demoTemplate', { static: true }) demoTemplateRef: TemplateRef<any>;

  constructor(
    private popUpModalOperatorService: PopUpModalOperatorService,
    private toastrOperatorService: ToastrOperatorService
  ) { }

  ngOnInit(): void {
  }

  onClickDemoTextModal() {
    const modalTitle = 'Text Modal';
    const modalText = 'You can put text here.';
    const modalConfig: PopUpModalConfig = {
                                              title: modalTitle,
                                              modalType: 'confirm'
                                            };
    const modalRef = this.popUpModalOperatorService.openPopupModal(modalText, modalConfig);

    modalRef.afterClose$.subscribe(
      res => {
        // Do something after the modal close.
        const toastrMessage = 'Close by: ' + res.triggerCloseType;
        this.toastrOperatorService.showSuccessToastr(toastrMessage, modalTitle);
      },
      error => {
        // Do something when modal error.
        const errorMessage = error.error_msg || error;
        this.toastrOperatorService.showErrorToastr(errorMessage, modalTitle);
      }
    )
  }

  onClickDemoTemplateModal() {
    const modalTitle = 'Template Modal';
    const modalConfig: PopUpModalConfig = {
                                              title: modalTitle,
                                              modalType: 'confirm'
                                            };
    const modalRef = this.popUpModalOperatorService.openPopupModal(this.demoTemplateRef, modalConfig);

    modalRef.afterClose$.subscribe(
      res => {
        // Do something after the modal close.
        const toastrMessage = 'Close by: ' + res.triggerCloseType;
        this.toastrOperatorService.showSuccessToastr(toastrMessage, modalTitle);
      },
      error => {
        // Do something when modal error.
        const errorMessage = error.error_msg || error;
        this.toastrOperatorService.showErrorToastr(errorMessage, modalTitle);
      }
    )
  }

  onClickDemoComponentModal() {
    const modalTitle = 'Component Modal';
    const modalConfig: PopUpModalConfig = {
                                              title: modalTitle,
                                              modalType: 'confirm'
                                            };
    const modalRef = this.popUpModalOperatorService.openPopupModal(DemoComponentComponent, modalConfig);

    modalRef.afterClose$.subscribe(
      res => {
        // Do something after the modal close.
        const toastrMessage = 'Close by: ' + res.triggerCloseType;
        this.toastrOperatorService.showSuccessToastr(toastrMessage, modalTitle);
      },
      error => {
        // Do something when modal error.
        const errorMessage = error.error_msg || error;
        this.toastrOperatorService.showErrorToastr(errorMessage, modalTitle);
      }
    )
  }

  onClickDemoFormModal(isSetOldData) {
    const modalTitle = 'Component Modal';
    const oldData = {
      field01: 123,
      field02: 'abc'
    }
    const modalConfig: PopUpModalConfig = {
                                              title: modalTitle,
                                              modalType: 'submit',
                                              data: {
                                                      originalData: oldData,
                                                      isEdit: isSetOldData
                                                    }
                                            };
    const modalRef = this.popUpModalOperatorService.openPopupModal(DemoFormComponent, modalConfig);

    modalRef.afterClose$.subscribe(
      res => {
        // Do something after the modal close.
        const toastrMessage = 'Close by: ' + res.triggerCloseType;
        this.toastrOperatorService.showSuccessToastr(toastrMessage, modalTitle);
      },
      error => {
        // Do something when modal error.
        const errorMessage = error.error_msg || error;
        this.toastrOperatorService.showErrorToastr(errorMessage, modalTitle);
      }
    )
  }

}
