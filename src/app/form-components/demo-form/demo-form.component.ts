import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegexService } from '../../public-share/service/regex.service';
import {
  MODAL_DATA_INJECTION_TOKEN,
  MODAL_PARENT_FORM_KEY,
  MODAL_CHILD_FORM_KEY
} from '../../public-share/service/global-constant.service';
import { PopUpModalConfig, SubmitModal } from '../../public-share/interface/pop-up-modal';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit, SubmitModal {

  demoModalForm = this.formBuilder.group({
    field01: ['', [Validators.required, Validators.pattern(this.regexService.getRule('number'))]],
    field02: ['']
  });

  isEdit: boolean = false;
  originalData;

  constructor(
    @Inject(MODAL_DATA_INJECTION_TOKEN) public modalConfig: PopUpModalConfig,
    private formBuilder: FormBuilder,
    private regexService: RegexService
  ) { }

  ngOnInit(): void {
    if (this.modalConfig.data && this.modalConfig.data.isEdit) {
      this.isEdit = true;
      this.originalData = this.modalConfig.data.originalData;
      this.demoModalForm.get('field01').setValue(this.originalData.field01);
      this.demoModalForm.get('field02').setValue(this.originalData.field02);
    }

    this.modalConfig[MODAL_PARENT_FORM_KEY].addControl(MODAL_CHILD_FORM_KEY, this.demoModalForm);
  }

  submit(): Observable<any> {
    const data = this.demoModalForm.getRawValue();

    return new Observable<any>(subscriber => {
      console.log('form modal submit data')
      console.log(data)
      console.log('form modal submit data')
      subscriber.next(true);
      // You can call ajax here
      // If ajax success => subscriber.next(true);
      // If ajax error => subscriber.error(err);
    });
  }

}
