import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrOperatorService } from './toastr-operator.service';
import { TOEKN_SEESION_NAME } from './global-constant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private toastrOperatorService: ToastrOperatorService,
    private translateService: TranslateService
  ) { }

  private checkLogin(): boolean {
    const loginToken: string = localStorage.getItem(TOEKN_SEESION_NAME) || '';

    if (loginToken === '') {
      const toastMessage = this.translateService.instant('PAGE.MAIN_FRAME.MESSAGE.ERROR.NOT_LOGIN')

      this.toastrOperatorService.showWarningToastr(toastMessage);
      this.router.navigate(['/login'], {queryParams: {returnPath: window.location.pathname}});

      return false;
    }

    return true;
  }

  canActivate(): boolean {
    return this.checkLogin();
  }
}
