import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '../../public-share/service/regex.service';
import { ToastrOperatorService } from '../../public-share/service/toastr-operator.service';

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent implements OnInit {
  demoForm: FormGroup;
  isDemoDynamicValidate = false;
  formResultStr = '';

  constructor(
    private formBuilder: FormBuilder,
    private regexService: RegexService,
    private toastrOperatorService: ToastrOperatorService
  ) { }

  ngOnInit(): void {
    this.demoForm = this.formBuilder.group({
      field01: ['', [Validators.required, Validators.pattern(this.regexService.getRule('number'))]],
      field02: [''],
      field03: ['']
    });

    this.demoForm.get('field03').valueChanges.subscribe(value => {
      if ((value !== '') && (this.demoForm.get('field03').validator === null)) {
        this.demoForm.get('field03').setValidators([Validators.pattern(this.regexService.getRule('number'))]);

        // Avoid to trigger value change again.
        this.demoForm.get('field03').updateValueAndValidity({emitEvent: false});
      } else if ((value === '') && (this.demoForm.get('field03').validator !== null)) {
        this.demoForm.get('field03').clearValidators();

        // Avoid to trigger value change again.
        this.demoForm.get('field03').updateValueAndValidity({emitEvent: false});
      }
    });
  }

  onClickResetForm() {
    this.demoForm.get('field01').setValue(123);
    this.demoForm.get('field02').setValue(345);
  }

  onClickValidateForm() {
    if (this.demoForm.valid) {
      this.toastrOperatorService.showSuccessToastr(
        'Form Validate Successfully!',
        'Form Validate'
      );
    } else {
      this.demoForm.markAllAsTouched();
    }
  }

  onClickShowFormResult() {
    // It also can get form value by field name.
    // Ex. this.demoForm.get('field01').value
    let formResult = this.demoForm.getRawValue();

    if (!this.isDemoDynamicValidate) {
      delete formResult.field03;
    }

    this.formResultStr = JSON.stringify(formResult);
  }

}
