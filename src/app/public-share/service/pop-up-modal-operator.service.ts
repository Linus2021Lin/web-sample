import { Injectable, TemplateRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import {
  MODAL_DATA_INJECTION_TOKEN,
  MODAL_PARENT_FORM_KEY
} from '../service/global-constant.service';
import { ModalEventsService } from '../component/pop-up-modal/service/modal-events.service';
import { PopUpModalComponent } from '../component/pop-up-modal/pop-up-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpModalOperatorService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  private createInjector(eventsServiceRef: ModalEventsService, data: any) {
    const injectorTokens = new WeakMap();

    injectorTokens.set(MODAL_DATA_INJECTION_TOKEN, data);
    injectorTokens.set(ModalEventsService, eventsServiceRef);

    return new PortalInjector(this.injector, injectorTokens);
  }

  openPopupModal<R = any, T = any>(
    content: string | TemplateRef<any> | any,
    data: T
  ): ModalEventsService<R>  {
    // Init modal
    const strategy = this.overlay
                      .position()
                      .global()
                      .centerHorizontally()
                      .centerVertically();
    const overlayConfigs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'modal-background',
      panelClass: 'overlay-panel',
      positionStrategy: strategy
    });
    const overlayRef = this.overlay.create(overlayConfigs);
    const eventsServiceRef = new ModalEventsService<R, T>(overlayRef);
    // init parent component
    const parentInjector = this.createInjector(eventsServiceRef, data);
    const parentComponent = new ComponentPortal(PopUpModalComponent, null, parentInjector);
    const modalComponentRef = overlayRef.attach(parentComponent);
    // init parent form
    const parentForm = modalComponentRef.instance.parentForm;
    data[MODAL_PARENT_FORM_KEY] = parentForm;
    // init child component
    let childComponent;

    if (content instanceof TemplateRef) {
      childComponent = new TemplatePortal(content, null);
    } else if (typeof content === 'string') {
      const parserDomId = 'parserDom';
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(
                                                      `<span id="${parserDomId}">${content}</span>`,
                                                      'text/html'
                                                    );
      const childDom = htmlElement.getElementById(parserDomId);

      childComponent = new DomPortal(childDom);
    } else {
      const childInjector = this.createInjector(eventsServiceRef, data);

      childComponent = new ComponentPortal(content, null, childInjector);
    }

    modalComponentRef.instance.modalOutlet = childComponent;
    eventsServiceRef.overlayInstance = modalComponentRef.instance;

    return eventsServiceRef;
  }
}
