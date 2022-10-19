import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
	private ruleMap = new Map();

  constructor() {
    this.ruleMap.set('number', /^[0-9]+$/);
  }

	getRule(type: string): RegExp {
		return this.ruleMap.get(type);
	}
}
