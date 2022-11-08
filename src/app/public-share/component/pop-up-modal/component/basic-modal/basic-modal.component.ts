import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicModalObj } from '../../../../interface/modal';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public modelConfig: BasicModalObj
  ) { }

  ngOnInit(): void {
  }

}
