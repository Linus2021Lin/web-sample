import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './public-share/service/http-interceptor.service';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';

// Translate Setting
export function i18nJsonLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function translateInitializerFactory(translate: TranslateService) {
  return () => {
    let language = window.localStorage['language'];

    // Default language: chinese
    if (!language) {
      language = 'cn';
    }

    translate.setDefaultLang(language);

    return translate.use(language).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    CookieModule.forRoot(),
    ToastrModule.forRoot({
      toastClass: 'ngx-toastr mars-toast',
      closeButton: true,
      easeTime: 500,
      extendedTimeOut: 1000,
      timeOut: 2000
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: i18nJsonLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    // Set translate init setting before app init.
    {
      provide: APP_INITIALIZER,
      useFactory: translateInitializerFactory,
      deps: [TranslateService],
      // let it can set multi-setting before app init
      multi: true
    },
    ...httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
