import { Injectable } from '@angular/core';
import { I18N_SEESION_NAME, DEFAULT_I18N_LANGUAGE } from './global-constant.service';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor() { }

	getI18nLanguage(): string{
		if (localStorage){
			return localStorage[I18N_SEESION_NAME] || DEFAULT_I18N_LANGUAGE;
		}
		else{
			return DEFAULT_I18N_LANGUAGE;
		}
	}

	setI18nLanguage(language: string){
		if (localStorage){
			localStorage[I18N_SEESION_NAME] = language;
		}
	}
}
