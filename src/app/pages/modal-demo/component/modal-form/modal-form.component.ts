import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegexService } from '../../../../public-share/service/regex.service';
import { SubmitModal } from '../../../../public-share/component/pop-up-modal/service/modal-interface.service';
import { MODAL_DATA, FormModalObj } from '../../../../public-share/interface/modal';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormComponent implements OnInit, SubmitModal {
  modalForm: FormGroup;

  constructor(
    @Inject(MODAL_DATA) public modalData: FormModalObj,
    private formBuilder: FormBuilder,
    private regexService: RegexService
  ) { }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      field01: ['', [Validators.required, Validators.pattern(this.regexService.getRule('number'))]],
      field02: [this.modalData.data['defaultData']]
    });
  }

  submit(): Observable<any> {
    return new Observable<any>(
      subscriber => {
        if (this.modalForm.valid) {
          // You can submit the data to API here
          // If API response success: subscriber.next(true)
          // If API response error: subscriber.error(errorResponse)
          subscriber.next(true);
        } else {
          this.modalForm.markAllAsTouched();
        }
      }
    );
  }

}
