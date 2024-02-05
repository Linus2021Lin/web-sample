import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrOperatorService } from './toastr-operator.service';
import { TOEKN_SEESION_NAME } from './global-constant.service';

// Set Token in Headers into HttpRequest
@Injectable()
export class SetTokenHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(TOEKN_SEESION_NAME) || '';
    const requestWithToken = req.clone({ setHeaders: {Authorization: `Bearer ${token}`}});

    return next.handle(requestWithToken);
  }
}

// Handle fail case of HttpRequest
@Injectable()
export class HandleRequestFailHttpInterceptor implements HttpInterceptor {

  constructor(
    private toastrOperatorService: ToastrOperatorService,
    private translateService: TranslateService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        const errorObj = error.error
        const toastTitle = this.translateService.instant('API.ERROR.MESSAGE.TITLE')
        const toastMessage = errorObj.status + ': ' + errorObj.error_msg

        this.toastrOperatorService.showErrorToastr(toastMessage, toastTitle)

        return throwError(errorObj);
      })
    );
  }

}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SetTokenHttpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HandleRequestFailHttpInterceptor,
    multi: true
  }
];
