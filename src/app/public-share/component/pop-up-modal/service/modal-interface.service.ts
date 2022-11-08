import { Injectable } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Subscription, Observable } from 'rxjs';
import { ModalCloseObj } from '../../../interface/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalInterfaceService<R = any> {
  afterClose$ = new Subject<ModalCloseObj<R>>();

  constructor(
    public overlay: OverlayRef
  ) { }

  error(err: any) {
    this.afterClose$.error(err);
    this.afterClose$.complete();
    this.overlay.dispose();
  }

  close(data: R) {
    this.afterClose$.next({type: 'close', data: data});
    this.afterClose$.complete();
    this.overlay.dispose();
  }

  subscribe(
            next?: (value: ModalCloseObj<R>) => void,
            error?: (error: any) => void
          ): Subscription {
    return this.afterClose$.subscribe(
                                      res => next ? next(res) : () => {},
                                      err => error ? error(err) : () => {}
                                    );
  }
}

export abstract class SubmitModal {
  abstract submit(): Observable<any>;
}
