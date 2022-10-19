import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainFrameOperatorService {
  appDrawerRef: any;
  currentUrl = new BehaviorSubject<string>(undefined);

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  closeDrawer() {
    this.appDrawerRef.close();
  }

  openDrawer() {
    this.appDrawerRef.open();
  }

  getDrawerWidth() {
    const drawerDom = this.appDrawerRef._elementRef.nativeElement;

    return drawerDom.offsetWidth;
  }
}
