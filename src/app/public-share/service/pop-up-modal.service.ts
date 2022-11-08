import { Injectable, TemplateRef, ComponentRef, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { BasicModalComponent } from '../component/pop-up-modal/component/basic-modal/basic-modal.component';
import { FormModalComponent } from '../component/pop-up-modal/component/form-modal/form-modal.component';
import { ModalInterfaceService } from '../component/pop-up-modal/service/modal-interface.service';
import { MODAL_DATA, BasicModalObj } from '../interface/modal';

@Injectable({
  providedIn: 'root'
})
export class PopUpModalService {
  private dialogRef: MatDialogRef<BasicModalComponent>;

  dialogComponentRef: ComponentRef<any>;

  constructor(
    public matDialog: MatDialog,
    private overlay: Overlay,
    private injector: Injector
  ) { }

  private createInjector(modalInterfaceService: ModalInterfaceService, data: any) {
    const injectorTokens = new WeakMap();

    injectorTokens.set(MODAL_DATA, data);
    injectorTokens.set(ModalInterfaceService, modalInterfaceService);

    return new PortalInjector(this.injector, injectorTokens);
  }

  openBasicModal(model: BasicModalObj, additionalDialogConfigData?: any): MatDialogRef<BasicModalComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.matDialog.open(BasicModalComponent, {
      panelClass: 'basic-modal',
      maxWidth: '90%',
      data: model,
      ...additionalDialogConfigData
    });

    this.dialogRef.addPanelClass(model.size || 'small');

    return this.dialogRef;
  }

  openFormModal<R = any, T = any>(content: string | TemplateRef<any> | any,data: T): ModalInterfaceService<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'modal-background',
      panelClass: 'application-overlay-wrapper'
    });
    const overlayRef = this.overlay.create(configs);
    const modalOverlayRef = new ModalInterfaceService<R>(overlayRef);
    const parentInjector = this.createInjector(modalOverlayRef, data);
    const parentComponent = new ComponentPortal(FormModalComponent, null, parentInjector);
    const componentRef = overlayRef.attach(parentComponent);
    const childInjector = this.createInjector(modalOverlayRef, data);
    const childComponent = new ComponentPortal(content, null, childInjector);

    componentRef.instance.modalOutlet = childComponent;

    return modalOverlayRef;
  }
}
