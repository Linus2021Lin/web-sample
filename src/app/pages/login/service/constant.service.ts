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
      { label: '简中', value: 'cn'},
      { label: '繁中', value: 'tc'},
      { label: 'English', value: 'en'}
    ];
  }
}
