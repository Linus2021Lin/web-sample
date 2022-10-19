import { Injectable } from '@angular/core';
import { SimpleOptionObject } from '../../../public-share/interface/common';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  getLoginServerOptions():SimpleOptionObject[] {
    return [
      { label: 'Auth Server01', value: 'auth01'},
      { label: 'Auth Server02', value: 'auth02'}
    ];
  }

  getLanguageOptions():SimpleOptionObject[] {
    return [
      { label: '中文', value: 'cn'},
      { label: 'English', value: 'en'}
    ];
  }
}
