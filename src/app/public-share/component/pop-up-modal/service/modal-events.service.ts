import { Injectable } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Subscription } from 'rxjs';
import { ModalCloseEventConfig } from '../../../interface/pop-up-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalEventsService<R = any, T = any> {
  afterClose$ = new Subject<ModalCloseEventConfig<R>>();
  overlayInstance;

  constructor(
    public overlayRef: OverlayRef
  ) {
    this.overlayRef.backdropClick().subscribe(() => {
      this._close({
        triggerCloseType: 'backdropClick',
        data: null
      });
    });
  }

  private _close(closeResponse: ModalCloseEventConfig<R>) {
    this.afterClose$.next(closeResponse);
    this.afterClose$.complete();
    this.overlayRef.dispose();
  }

  public error(err: any) {
    this.afterClose$.error(err);
    this.afterClose$.complete();
    this.overlayRef.dispose();
  }

  public close(closeResponse: ModalCloseEventConfig<R>) {
    this._close(closeResponse);
  }

  public subscribe(
    next?: (value: ModalCloseEventConfig<R>) => void,
    error?: (error: any) => void
  ): Subscription {
    let subscription = this.afterClose$.subscribe(
          res => next ? next(res) : () => {},
          err => error ? error(err) : () => {}
        );

    return subscription;
  }

  public changeTitleText(type: 'title' | 'subTitle', sourceData) {
    this.overlayInstance[type] = sourceData;
  }
}
