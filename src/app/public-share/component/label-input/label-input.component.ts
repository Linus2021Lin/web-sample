import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelInputComponent implements OnInit {
  @Input() label: string;
  @Input() labelTooltip?: string;
  @Input() isNotFormInput: boolean = false;
  @Input() isRequired: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
