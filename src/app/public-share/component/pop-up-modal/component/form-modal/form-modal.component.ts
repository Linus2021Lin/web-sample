import {
  Component,
  OnDestroy,
  ViewEncapsulation,
  ComponentRef,
  Inject
} from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { MODAL_DATA } from '../../../../interface/modal';
import { ModalInterfaceService, SubmitModal } from '../../service/modal-interface.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormModalComponent implements OnDestroy {
  private componentRef: ComponentRef<SubmitModal>;

  modalOutlet: ComponentPortal<any>;
  modalTitle: string;
  isSubmitLoading: boolean = false;

  constructor(
    @Inject(MODAL_DATA) public modalData,
    private modalInterfaceService: ModalInterfaceService
  ) {
    this.modalTitle = modalData.title;
  }

  ngOnDestroy(): void {
    this.modalInterfaceService.close(null);
  }

  receiveReference(ref) {
    this.componentRef = ref;
  }

  onClickCloseBtn() {
    this.modalInterfaceService.close(null);
  }

  onClickSubmitBtn(): void {
    if (this.componentRef && this.componentRef.instance && this.componentRef.instance.submit) {
      this.isSubmitLoading = true;

      this.componentRef.instance.submit().subscribe(
        (res) => {
          this.isSubmitLoading = false;
          this.modalInterfaceService.close(res);
        },
        (err) => {
          this.isSubmitLoading = false;
          this.modalInterfaceService.error(err);
        }
      )
    } else {
      this.modalInterfaceService.error("No submit function.");
    }
  }

}
