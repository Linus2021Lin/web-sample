import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PopUpModalService } from '../../public-share/service/pop-up-modal.service';
import { ToastrOperatorService } from '../../public-share/service/toastr-operator.service';
import { ModalFormComponent } from './component/modal-form/modal-form.component';
import { BasicModalObj } from '../../public-share/interface/modal';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent implements OnInit {
  @ViewChild('hintTemplate', { static: true }) hintTemplateRef: TemplateRef<any>;

  constructor(
    private popUpModalService: PopUpModalService,
    private toastrOperatorService: ToastrOperatorService
  ) { }

  ngOnInit(): void {
  }

  onClickDemoMessageModal() {
    // You can choose string content or template content
    const model: BasicModalObj = {
      title: 'Message Hint',
      content: 'You can put message here.',
      isShowCancelBtn: true,
      isShowConfirmBtn: false
    };

    this.popUpModalService.openBasicModal(model)
      .afterClosed().subscribe(result => {
        // Do something after the modal close.
      });
  }

  onClickDemoConfirmModal() {
    // You can choose string content or template content
    const model: BasicModalObj = {
      title: 'Data Confirm',
      template: this.hintTemplateRef,
      isShowCancelBtn: true,
      isShowConfirmBtn: true
    };

    this.popUpModalService.openBasicModal(model)
      .afterClosed().subscribe(result => {
        // Do something after the modal close.
        if(result) {
          this.toastrOperatorService.showSuccessToastr(
            'Data Confirm Complete!',
            'Data Confirm'
          );
        } else {
          this.toastrOperatorService.showWarningToastr(
            'Data NOT Confirm!',
            'Data Confirm'
          );
        }
      });
  }

  onClickDemoFormModal() {
    const modalService = this.popUpModalService.openFormModal(ModalFormComponent,
                          {
                            title: 'Form Modal Title',
                            data: {
                              defaultData: 'Default Value From Page.'
                            }
                          });
    const modalSubscription = modalService.subscribe(response => {
      // If the data of response is null
      // Means the modal is NOT submit, it just be closed.
      if(response.data) {
        this.toastrOperatorService.showSuccessToastr(
          'Submit Form Success!',
          'Success'
        );
      }

      modalSubscription.unsubscribe();
    }, (err) => {
      this.toastrOperatorService.showErrorToastr(
        'Submit Form Error!',
        'Error'
      );

      modalSubscription.unsubscribe();
    });
  }

}
