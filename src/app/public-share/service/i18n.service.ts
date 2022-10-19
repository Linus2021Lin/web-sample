import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor() { }

	getLanguage(): string{
		if (localStorage){
			return localStorage['language'] || 'cn';
		}
		else{
			return 'cn';
		}
	}

	setLanguage(language: string){
		if (localStorage){
			localStorage['language'] = language;
		}
	}
}
