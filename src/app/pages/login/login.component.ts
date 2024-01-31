import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../public-share/service/i18n.service';
import { TOEKN_SEESION_NAME } from '../../public-share/service/global-constant.service';
import { ConstantService } from './service/constant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  siteLanguage: string;
  loginServerOptions = [];
  languageOptions = [];
  isLoginError: boolean = false;
  isUnknownError: boolean = false;
  isLoginSuccess: boolean = false;
  isLogin: boolean = false;
  returnUrl: string;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constantService: ConstantService,
    private i18nService: I18nService
  ) {
    this.loginServerOptions = this.constantService.getLoginServerOptions();
    this.languageOptions = this.constantService.getLanguageOptions();
  }

  ngOnInit(): void {
    const languageCode = this.i18nService.getLanguage();

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.siteLanguage = this.languageOptions.find(option => option.value === languageCode).label;

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      loginServer: ['auth01', [Validators.required]]
    });
  }

  private loginWithAuth01() {
    const loginData = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    };
    console.log('login with auth01')
    console.log(loginData)
    console.log('login with auth01')
    // Call ajax that auth with auth01 server
    localStorage.setItem(TOEKN_SEESION_NAME, 'test token');
    this.router.navigate([this.returnUrl]);
  }

  private loginWithAuth02() {
    const loginData = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    };
    console.log('login with auth02')
    console.log(loginData)
    console.log('login with auth02')
    // Call ajax that auth with auth02 server
    localStorage.setItem(TOEKN_SEESION_NAME, 'test token');
    this.router.navigate([this.returnUrl]);
  }

  onClickLanguageOption(option): void {
    if (this.siteLanguage === option.label) return;

    this.siteLanguage = option.label;
    this.translateService.use(option.value);
    this.i18nService.setLanguage(option.value);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginServer = this.loginForm.get('loginServer').value;

      this.isLogin = true;
      this.isLoginError = false;
      this.isUnknownError = false;

      if (loginServer === 'auth01') {
        this.loginWithAuth01();
      } else if (loginServer === 'auth02') {
        this.loginWithAuth02();
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
